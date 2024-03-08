import { Recipe } from "../models/Recipe";
import axios from "axios";
const { VITE_API_URL } = import.meta.env;

export async function getRecipe(recipeId: number): Promise<Recipe>
{
	const url = VITE_API_URL + "/recipes/" + recipeId.toString();

	const response = await axios.get<Recipe>(url, { withCredentials: true });

	return response.data;
}

export async function updateRecipe(recipe: Recipe): Promise<Recipe>
{
	const url = VITE_API_URL + "/recipes/" + recipe.id;

	const response = await axios.put<Recipe>(url, recipe, { withCredentials: true });

	return response.data;
}
