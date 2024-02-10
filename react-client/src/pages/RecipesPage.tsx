import { useEffect, useRef, useState } from "react";
import { PagerArgs } from "../components/Pager";
import { PageableRequestParameters } from "../models/Pageable";
import { Recipe } from "../models/Recipe";
import { getRecipes } from "../controllers/RecipeController";
import RecipesList from "../components/recipesList/RecipesList";

export default function RecipesPage(): JSX.Element
{
	const pageableRequestParameters = useRef<PageableRequestParameters>({
		page: "0",
		size: "4",
		prop: "null",
		dir: "null",
	});

	const [ recipes, setRecipes ] = useState<Recipe[]>([]);
	const [ pagerArgs, setPagerArgs ] = useState<PagerArgs>({} as PagerArgs);

	useEffect(() =>
	{
		requestRecipes();
	}, []);

	function requestRecipes(): void
	{
		void getRecipes(pageableRequestParameters.current).then((recipesResponseData) =>
		{
			setRecipes(recipesResponseData.content);
			setPagerArgs({
				activePage: recipesResponseData.pageable.pageNumber,
				totalPages: recipesResponseData.totalPages,
				setActivePageCallback: setActivePage,
			});
		});
	}

	function setActivePage(activePage: number): void
	{
		pageableRequestParameters.current.page = activePage.toString();

		requestRecipes();
	}

	return (
		<div className="box">
			<div className="box-content" id="order-table">
				<RecipesList recipes={recipes} />
			</div>
		</div>
	);
}
