import { useEffect, useRef, useState } from "react";
import { Ingredient } from "../models/Ingredient";
import { getIngredients } from "../controllers/IngredientsController";
import IngredientsList from "../components/ingredientsList/IngredientsList";
import { PageableRequestParameters } from "../models/Pageable";
import Pager, { PagerArgs } from "../components/Pager";

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
		<div className="box">
			<div className="box-content" id="order-table">
				<IngredientsList ingredients={ingredients} />
				<Pager pagerArgs={pagerArgs} />
			</div>
		</div>
	</>;
}