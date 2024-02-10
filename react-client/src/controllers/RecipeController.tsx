import { PageableRequestParameters } from "../models/Pageable";
import { Recipe, RecipesResponseData } from "../models/Recipe";

const { VITE_API_URL } = import.meta.env;

export async function getRecipes(pageableRequestParameters: PageableRequestParameters): Promise<RecipesResponseData>
{
	const queryParameters = new URLSearchParams(pageableRequestParameters);

	const url = VITE_API_URL + "/recipes/allPageable?" + queryParameters.toString();

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		}
	});

	const recipesPromise: Promise<RecipesResponseData> = response.json().then((json) =>
	{
		const recipesResponseDate: RecipesResponseData = {} as RecipesResponseData;

		Object.assign(recipesResponseDate, json);

		return recipesResponseDate;

	})

	return recipesPromise;
}


export async function getRecipesAll(): Promise<Recipe[]>
{
	const url = VITE_API_URL + "/recipes";

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		}
	});

	const recipesPromise: Promise<Recipe[]> = response.json().then((json) =>
	{
		return json;
	})

	return recipesPromise;
}