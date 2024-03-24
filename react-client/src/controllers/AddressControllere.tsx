import { ClientAddress } from "../models/Order";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export async function addAddress(address: ClientAddress): Promise<ClientAddress>
{
    const url = VITE_API_URL + "/address";

    const response = await axios.post<ClientAddress>(url, address, { withCredentials: true });

    return response.data;
}

export async function updateAddress(address: ClientAddress): Promise<ClientAddress>
{
    const url = VITE_API_URL + "/address";

    const response = await axios.put<ClientAddress>(url, address, { withCredentials: true });

    return response.data;
}