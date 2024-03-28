import { PageableRequestParameters } from "../models/Pageable";
import { Ingredient, IngredientsResponseData } from "../models/Ingredient";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export async function getIngredients(pageableRequestParameters: PageableRequestParameters): Promise<IngredientsResponseData>
{
	const queryParameters = new URLSearchParams(pageableRequestParameters);

	const url = VITE_API_URL + "/ingredients/allPageable";

	const response = await axios.get<IngredientsResponseData>(url, {
		withCredentials: true,
		params: queryParameters
	})

	return response.data;
}


export async function getIngredientsAll(): Promise<Ingredient[]>
{
	const url = VITE_API_URL + "/ingredients";

	const response = await axios.get<Ingredient[]>(url, { withCredentials: true });

	return response.data;
}

export async function addIngredient(ingredient?: Ingredient): Promise<Ingredient>
{
	const url = VITE_API_URL + "/ingredients";

	const response = await axios.post<Ingredient>(url, ingredient || {}, { withCredentials: true });

	return response.data;
}