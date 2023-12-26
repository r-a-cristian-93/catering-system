import { Credentials } from "../models/Credentials";
const { VITE_API_URL } = import.meta.env;

export default async function requestUserLogin(credentials: Credentials): Promise<Response>
{
	const response = await fetch(VITE_API_URL + "/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams(credentials),
		credentials: "include",
	});

	return response;
}
