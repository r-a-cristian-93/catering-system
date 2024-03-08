import { Unit } from "../models/Recipe";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export default async function getUnitsList(): Promise<Unit[]>
{
	const url = VITE_API_URL + "/units";

	const response = await axios.get<Unit[]>(url, { withCredentials: true });

	return response.data;
}
