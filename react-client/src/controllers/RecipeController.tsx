import { Recipe } from "../models/Recipe";
const { VITE_API_URL } = import.meta.env;

export async function getRecipe(recipeId: number): Promise<Recipe>
{
	const url = VITE_API_URL + "/recipes/" + recipeId.toString();

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type" : "application/json"
		}
	});

	const recipePromise: Promise<Recipe> = response.json().then((json) =>
	{
		const recipe: Recipe = {} as Recipe;

		Object.assign(recipe, json);

		return recipe;
	})

	return recipePromise;
}