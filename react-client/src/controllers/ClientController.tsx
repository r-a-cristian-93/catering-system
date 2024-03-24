import { Client, ClientResponseData } from "../models/Order";
import { PageableRequestParameters } from "../models/Pageable";
import axios from "axios";
const { VITE_API_URL } = import.meta.env;


export async function getClients(pageableRequestParameters: PageableRequestParameters): Promise<ClientResponseData>
{
    const url = VITE_API_URL + "/clients/allPageable";

    const response = await axios.get<ClientResponseData>(url, {
        withCredentials: true,
        params: pageableRequestParameters
    });

    return response.data
}

export async function getClientsByNameContaining(name: string, pageableRequestParameters: PageableRequestParameters): Promise<ClientResponseData>
{
    const queryParameters = new URLSearchParams({
        ...pageableRequestParameters,
        name: name
    });

    const url = VITE_API_URL + "/clients/byNameContainginPageable";

    const response = await axios.get<ClientResponseData>(url, {
        withCredentials: true,
        params: queryParameters,
    });

    return response.data;
}

export async function addClient(client: Client): Promise<Client>
{
    const url = VITE_API_URL + "/clients";

    const response = await axios.post<Client>(url, client, { withCredentials: true });

    return response.data
}

export async function updateClient(client: Client): Promise<Client>
{
    const url = VITE_API_URL + "/clients";

    const response = await axios.put<Client>(url, client, { withCredentials: true });

    return response.data
}