import { Order } from "../models/Order/Order";
import { OrderRequestParameters } from "../models/Order/OrderRequestParameters";
import { OrdersResponseData } from "../models/Order/OrdersResponseData";

const { VITE_API_URL } = import.meta.env;

export async function getOrders(orderRequestParameters: OrderRequestParameters): Promise<OrdersResponseData>
{
	const queryParameters = new URLSearchParams(orderRequestParameters);

	const url = VITE_API_URL + "/orders/allPageable?" + queryParameters.toString();

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const ordersList: Promise<OrdersResponseData> = response.json().then((json) =>
	{
		const responseData: OrdersResponseData = {} as OrdersResponseData;
		Object.assign(responseData, json);

		return responseData;
	});

	return ordersList;
}

export async function addOrder(order: Order): Promise<Order>
{
	const url = VITE_API_URL + "/orders/";

	const response = await fetch(url, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(order)
	});

	const orderPromise: Promise<Order> = response.json().then((json) =>
	{
		const order: Order = {} as Order;

		Object.assign(order, json);

		return order;
	})

	return orderPromise;
}