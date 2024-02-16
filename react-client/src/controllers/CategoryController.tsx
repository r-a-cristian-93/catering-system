import { Category } from "../models/Recipe";

const { VITE_API_URL } = import.meta.env;

export default async function getCategoryList(): Promise<Category[]>
{
	const url = VITE_API_URL + "/category";

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const categoryPromise: Promise<Category[]> = response.json().then((json) =>
	{
		const responseData: Category[] = [];

		Object.assign(responseData, json);

		return responseData;
	});
	return categoryPromise;
}
