import { User } from "../models/User.js";
import axios from "axios";
const { VITE_API_URL } = import.meta.env;

export async function getUserInfo(): Promise<User>
{
	const url = VITE_API_URL + "/employees/myinfo";

	const response = await axios.get<User>(url, { withCredentials: true });

	return response.data;
}
