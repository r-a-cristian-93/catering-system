import { Order } from "../models/Order/Order";

const { VITE_API_URL } = import.meta.env;

export async function getOrder(orderId: number): Promise<Order>
{
	const url = VITE_API_URL + "/orders/" + orderId.toString();

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		}
	});

	const orderPromise: Promise<Order> = response.json().then((json) =>
	{
		const order: Order = {} as Order;
		Object.assign(order, json);

		return order;
	});

	return orderPromise;
}

export async function setNextOrderState(orderId: number): Promise<Order>
{
	const url = VITE_API_URL + "/orders/" + orderId + "/nextstep";

	const response = await fetch(url, {
		method: "PUT",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const orderPromise: Promise<Order> = response.json().then((json) =>
	{
		const order: Order = {} as Order;
		Object.assign(order, json);

		return order;
	});

	return orderPromise;
}

export async function updateOrder(order: Order): Promise<Order>
{
	const url = VITE_API_URL + "/orders" + order.id;

	const response = await fetch(url, {
		method: "PUT",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(order),
	});

	const orderPromise: Promise<Order> = response.json().then((json) =>
	{
		const order: Order = {} as Order;

		Object.assign(order, json);

		return order;
	})

	return orderPromise;
}