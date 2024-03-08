import { Category } from "../models/Recipe";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export default async function getCategoryList(): Promise<Category[]>
{
	const url = VITE_API_URL + "/category";

	const response = await axios.get<Category[]>(url, { withCredentials: true});

	return response.data;
}
