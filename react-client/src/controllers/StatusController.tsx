import { Status } from "../models/Order";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export default async function getStatusList(): Promise<Status[]>
{
	const url = VITE_API_URL + "/status";

	const response = await axios.get<Status[]>(url, { withCredentials: true });

	return response.data;
}
