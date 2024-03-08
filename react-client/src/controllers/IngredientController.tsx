import { Ingredient, IngredientPriceHistory } from "../models/Ingredient";
const { VITE_API_URL } = import.meta.env;

export async function getIngredient(ingredientId: number): Promise<Ingredient>
{
	const url = VITE_API_URL + "/ingredients/" + ingredientId.toString();

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type" : "application/json"
		}
	});

	const ingredientPromise: Promise<Ingredient> = response.json().then((json) =>
	{
		const ingredient: Ingredient = {} as Ingredient;

		Object.assign(ingredient, json);

		return ingredient;
	})

	return ingredientPromise;
}

export async function updateIngredient(ingredient: Ingredient): Promise<Ingredient>
{
	const url = VITE_API_URL + "/ingredients/" + ingredient.id;

	const response = await fetch(url, {
		method: "PUT",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(ingredient),
	});

	const ingredientPromise: Promise<Ingredient> = response.json().then((json) =>
	{
		const ingredient: Ingredient = {} as Ingredient;

		Object.assign(ingredient, json);

		return ingredient;
	})

	return ingredientPromise;
}

export async function getPriceHistory(ingredientId: number): Promise<IngredientPriceHistory[]>
{
	const url = VITE_API_URL + "/ingredients/" + ingredientId.toString() + "/priceHistory";

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type" : "application/json"
		}
	});

	return response.json();
}

export async function addPriceHistory(priceHistory: IngredientPriceHistory): Promise<IngredientPriceHistory>
{
	const url = VITE_API_URL + "/ingredients/" + priceHistory.ingredientId.toString() + "/priceHistory";

	const response = await fetch(url, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(priceHistory)
	});


	const priceHistoryPromise: Promise<IngredientPriceHistory> = response.json().then((json) =>
	{
		const priceHistory: IngredientPriceHistory = {} as IngredientPriceHistory;

		Object.assign(priceHistory, json);

		return priceHistory;
	})

	return priceHistoryPromise;
}