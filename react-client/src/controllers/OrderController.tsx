import { Order } from "../models/Order";

const { VITE_API_URL } = import.meta.env;

export default async function getOrder(orderId: number): Promise<Order>
{
	const url = VITE_API_URL + "/orders/" + orderId.toString();

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		}
	});

	const orderDetailsPromise: Promise<Order> = response.json().then((json) =>
	{
		const orderDetails: Order = {} as Order;
		Object.assign(orderDetails, json);

		return orderDetails;
	});

	return orderDetailsPromise;
}