import { Ingredient, IngredientPriceHistory } from "../models/Ingredient";
import axios from "axios";
const { VITE_API_URL } = import.meta.env;

export async function getIngredient(ingredientId: number): Promise<Ingredient>
{
	const url = VITE_API_URL + "/ingredients/" + ingredientId.toString();

	const response = await axios.get<Ingredient>(url, { withCredentials: true });

	return response.data;
}

export async function updateIngredient(ingredient: Ingredient): Promise<Ingredient>
{
	const url = VITE_API_URL + "/ingredients/" + ingredient.id;

	const response = await axios.put<Ingredient>(url, ingredient, { withCredentials: true });

	return response.data;
}

export async function getPriceHistory(ingredientId: number): Promise<IngredientPriceHistory[]>
{
	const url = VITE_API_URL + "/ingredients/" + ingredientId.toString() + "/priceHistory";

	const response = await axios.get<IngredientPriceHistory[]>(url, { withCredentials: true });

	return response.data;
}