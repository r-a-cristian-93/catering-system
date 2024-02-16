import { Unit } from "../models/Recipe";

const { VITE_API_URL } = import.meta.env;

export default async function getUnitList(): Promise<Unit[]>
{
	const url = VITE_API_URL + "/unit";

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const unitPromise: Promise<Unit[]> = response.json().then((json) =>
	{
		const responseData: Unit[] = [];

		Object.assign(responseData, json);

		return responseData;
	});
	return unitPromise;
}
