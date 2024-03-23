import { ClientAddress } from "../models/Order";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

// export async function getAddresses(clientId: number): Promise<ClientAddress[]>
// {
//     const url = VITE_API_URL + "/clients/" + clientId + "/addresses";

//     const response = await axios.get<ClientAddress[]>(url, { withCredentials: true });

//     return response.data;
// }

export async function addAddress(address: ClientAddress): Promise<ClientAddress>
{
    const url = VITE_API_URL + "/addresses";

    const response = await axios.post<ClientAddress>(url, address, { withCredentials: true });

    return response.data;
}