import { useEffect, useRef, useState } from "react";
import Pager, { PagerArgs } from "../components/generic/Pager/Pager";
import { PageableRequestParameters } from "../models/Pageable";
import { Recipe } from "../models/Recipe";
import { getRecipes } from "../controllers/RecipesController";
import RecipesList from "../components/recipesList/RecipesList";
import RecipeAddButton from "../components/recipesList/RecipeAddButton";
import SimplePage from "../components/generic/SimplePage/SimplePage";

export default function RecipesPage(): JSX.Element
{
	const pageableRequestParameters = useRef<PageableRequestParameters>({
		page: "0",
		size: "4",
		prop: "null",
		dir: "null",
	});

	const [ recipes, setRecipes ] = useState<Recipe[] | null>(null);
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
		<SimplePage title="Rețete" imagePath="/img/recipes.png">
			<RecipesList recipes={recipes} />
			<Pager pagerArgs={pagerArgs} />
			<RecipeAddButton />
		</SimplePage>
	);
}
