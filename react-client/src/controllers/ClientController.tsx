import { ClientResponseData } from "../models/Order/Order";
import { PageableRequestParameters } from "../models/Pageable";
const { VITE_API_URL } = import.meta.env;


export async function getClients(pageableRequestParameters: PageableRequestParameters): Promise<ClientResponseData>
{
	const queryParameters = new URLSearchParams(pageableRequestParameters);

    const url = VITE_API_URL + "/clients/allPageable?" + queryParameters.toString();

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const clientsPromise: Promise<ClientResponseData> = response.json().then((json) =>
    {
        const responseData: ClientResponseData = {} as ClientResponseData;

        Object.assign(responseData, json);

        return responseData;
    });

    return clientsPromise;
}

export async function getClientsByNameContaining(name: string, pageableRequestParameters: PageableRequestParameters): Promise<ClientResponseData>
{
	const queryParameters = new URLSearchParams({
        ...pageableRequestParameters,
        name: name
    });

    const url = VITE_API_URL + "/clients/byNameContainginPageable?" + queryParameters.toString();

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const clientsPromise: Promise<ClientResponseData> = response.json().then((json) =>
    {
        const responseData: ClientResponseData = {} as ClientResponseData;

        Object.assign(responseData, json);

        return responseData;
    });

    return clientsPromise;
}