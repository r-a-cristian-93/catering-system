import { Client } from "../models/Order/Order";
const { VITE_API_URL } = import.meta.env;


export async function getClients(): Promise<Client[]>
{
    const url = VITE_API_URL + "/clients";

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const clientsPromise: Promise<Client[]> = response.json().then((json) =>
    {
        const clients: ClientsList = {} as ClientsList;

        Object.assign(clients, json);

        return Object.values(clients).flatMap((client) => client);
    })

    return clientsPromise;
}

type ClientsList = {
    clients: Client[];
}