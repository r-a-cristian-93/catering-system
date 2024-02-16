import { OrderItem } from "../models/Order";

const { VITE_API_URL } = import.meta.env;

export async function getOrderItems(orderId: number): Promise<OrderItem[]>
{
    const url = VITE_API_URL + "/orders/" + orderId + "/details";

    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const orderItemsPromise: Promise<OrderItem[]> = response.json().then((json) =>
    {
        const orderItems: OrderItems = {} as OrderItems;

        Object.assign(orderItems, json);

        return Object.values(orderItems).flatMap((each) => each);
    });

    return orderItemsPromise;
}

export async function updateOrderItem(orderItem: OrderItem): Promise<OrderItem>
{
    const url: string = VITE_API_URL + "/orders/" + orderItem.orderId + "/details";

    const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItem),
    });

    const orderItemPromise: Promise<OrderItem> = response.json().then((json) =>
    {
        const orderItem: OrderItem = {} as OrderItem;

        Object.assign(orderItem, json);

        return orderItem;
    });

    return orderItemPromise;
}

export async function deleteOrderItem(orderItem: OrderItem): Promise<boolean>
{
    const url: string = VITE_API_URL + "/orders/" + orderItem.orderId + "/details";

    const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItem),
    });

    return response.json().then(() => response.ok);
}

export async function addOrderItem(orderItem: OrderItem): Promise<OrderItem>
{
    const url: string = VITE_API_URL + "/orders/" + orderItem.orderId + "/details";

    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItem),
    });

    return response.json().then((json) =>
    {
        const item: OrderItem = {} as OrderItem;

        Object.assign(item, json);

        return item;
    });
}

type OrderItems = {
    items: OrderItem[];
};
