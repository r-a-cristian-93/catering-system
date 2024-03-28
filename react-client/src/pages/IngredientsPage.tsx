import { useEffect, useRef, useState } from "react";
import { Ingredient } from "../models/Ingredient";
import { getIngredients } from "../controllers/IngredientsController";
import IngredientsList from "../components/ingredientsList/IngredientsList";
import { PageableRequestParameters } from "../models/Pageable";
import Pager, { PagerArgs } from "../components/generic/Pager/Pager";
import SimplePage from "../components/generic/SimplePage/SimplePage";
import IngredientAddButton from "../components/ingredientsList/IngredientAddButton";

export default function IngredientsPage(): JSX.Element
{
	const pageableRequestParameters = useRef<PageableRequestParameters>({
		page: "0",
		size: "4",
		prop: "null",
		dir: "null",
	});

	const [ ingredients, setIngredients ] = useState<Ingredient[] | null>(null);
	const [ pagerArgs, setPagerArgs ] = useState<PagerArgs>({} as PagerArgs);

	useEffect(() =>
	{
		requestIngredients();
	}, []);

	function requestIngredients(): void
	{
		void getIngredients(pageableRequestParameters.current).then((ingredientsResponseData) =>
		{
			setIngredients(ingredientsResponseData.content);
			setPagerArgs({
				activePage: ingredientsResponseData.pageable.pageNumber,
				totalPages: ingredientsResponseData.totalPages,
				setActivePageCallback: setActivePage,
			});
		});
	}

	function setActivePage(activePage: number): void
	{
		pageableRequestParameters.current.page = activePage.toString();

		requestIngredients();
	}

	return <>
		<SimplePage title="Ingrediente" imagePath="/img/ingredients.png">
			<IngredientsList ingredients={ingredients} />
			<Pager pagerArgs={pagerArgs} />
			<IngredientAddButton />
		</SimplePage>
	</>;
}