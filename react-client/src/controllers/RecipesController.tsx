import { PageableRequestParameters } from "../models/Pageable";
import { Recipe, RecipesResponseData } from "../models/Recipe";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export async function getRecipes(pageableRequestParameters: PageableRequestParameters): Promise<RecipesResponseData>
{
	const url = VITE_API_URL + "/recipes/allPageable";

	const response = await axios.get<RecipesResponseData>(url, {
		withCredentials: true,
		params: pageableRequestParameters
	});

	return response.data
}


export async function getRecipesAll(): Promise<Recipe[]>
{
	const url = VITE_API_URL + "/recipes";

	const response = await axios.get<Recipe[]>(url, { withCredentials: true });

	return response.data;
}


export async function addRecipe(recipe?: Recipe): Promise<Recipe>
{
	const url = VITE_API_URL + "/recipes/";

	const response = await axios.post<Recipe>(url, recipe || {}, { withCredentials: true });

	return response.data;
}