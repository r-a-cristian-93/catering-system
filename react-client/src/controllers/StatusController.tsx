import { Status } from "../models/Order";

const { VITE_API_URL } = import.meta.env;

export default async function getStatusList(): Promise<Status[]>
{
	const url = VITE_API_URL + "/status";

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const statusPromise: Promise<Status[]> = response.json().then((json) =>
	{
		const responseData: Status[] = [];

		Object.assign(responseData, json);

		return responseData;
	});
	return statusPromise;
}
