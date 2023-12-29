import { Order } from "../models/Order";

const { VITE_API_URL } = import.meta.env;

export async function getOrderItems(orderId: number): Promise<OrderItem[]>
{
    const url = VITE_API_URL + "/orders/" + orderId + "/details"

    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const orderItemsPromise: Promise<OrderItem[]> = response.json().then((json) =>
    {
        const orderItems: OrderItems = {} as OrderItems;

        Object.assign(orderItems, json);

        return Object.values(orderItems).flatMap(each => each);
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

type OrderItems = {
    items: OrderItem[];
}