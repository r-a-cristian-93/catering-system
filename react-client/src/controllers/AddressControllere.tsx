import { ClientAddress } from "../models/Order";

const { VITE_API_URL } = import.meta.env;

export async function getAddresses(clientId: number): Promise<ClientAddress[]>
{
    const url = VITE_API_URL + "/clients/" + clientId + "/addresses";

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response.json();
}

export async function addAddress(address: ClientAddress): Promise<ClientAddress>
{
    const url = VITE_API_URL + "/addresses";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(address),
    });

    const addressPromise: Promise<ClientAddress> = response.json().then((json) =>
    {
        const createdAddres: ClientAddress = {} as ClientAddress;

        Object.assign(createdAddres, json);

        return createdAddres;
    });

    return addressPromise;
}