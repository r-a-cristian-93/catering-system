import { Client } from "../models/Order/Order";
const { VITE_API_URL } = import.meta.env;


export async function getClients(): Promise<Client[]>
{
	const queryParameters = new URLSearchParams({
		page: "0",
		size: "4",
		prop: "id",
		dir: "DESC",
	});

    const url = VITE_API_URL + "/clients/allPageable?" + queryParameters.toString();

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

        console.log(clients);

        return Object.values(clients).flatMap((client) => client);
    })

    return clientsPromise;
}

type ClientsList = {
    clients: Client[];
}