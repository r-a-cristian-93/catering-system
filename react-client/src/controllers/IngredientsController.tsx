import { PageableRequestParameters } from "../models/Pageable";
import { Ingredient, IngredientsResponseData } from "../models/Ingredient";

const { VITE_API_URL } = import.meta.env;

export async function getIngredients(pageableRequestParameters: PageableRequestParameters): Promise<IngredientsResponseData>
{
	const queryParameters = new URLSearchParams(pageableRequestParameters);

	const url = VITE_API_URL + "/ingredients/allPageable?" + queryParameters.toString();

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		}
	});

	const ingredientsPromise: Promise<IngredientsResponseData> = response.json().then((json) =>
	{
		const ingredientsResponseDate: IngredientsResponseData = {} as IngredientsResponseData;

		Object.assign(ingredientsResponseDate, json);

		return ingredientsResponseDate;

	})

	return ingredientsPromise;
}


export async function getIngredientsAll(): Promise<Ingredient[]>
{
	const url = VITE_API_URL + "/ingredients";

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		}
	});

	const ingredientsPromise: Promise<Ingredient[]> = response.json().then((json) =>
	{
		return json;
	})

	return ingredientsPromise;
}