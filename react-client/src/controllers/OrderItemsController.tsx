import { Order } from "../models/Order";

const { VITE_API_URL } = import.meta.env;

export async function getOrderItems(orderId: number): Promise<string>
{
    const url = VITE_API_URL + "/orders/" + orderId + "/details"

    const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		}
	});

    const orderItemsPromise: Promise<string> = response.json().then((json) =>
    {
        return JSON.stringify(json);
    })

    return orderItemsPromise;
}

type Unit = {
    name: string;
};

type Category = {
    name: string;
};

type Recipe = {
    id: number;
    name: string;
    quantity: number;
    unit: Unit;
    category: Category;
    ingCost: number;
};

export type OrderItem = {
    id: number;
    order: Order;
    recipe: Recipe;
    servings: number;
};
