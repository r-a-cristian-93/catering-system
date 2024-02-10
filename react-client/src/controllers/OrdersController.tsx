import { Order, Status } from "../models/Order";
import { PageableRequestParameters } from "../models/Pageable";
import { OrdersResponseData } from "../models/Order";

const { VITE_API_URL } = import.meta.env;

export interface RequestBody
{}

export interface OrderStatusRequestBody extends RequestBody
{
	status: Status;
}


export async function getOrders(orderRequestParameters: PageableRequestParameters, body?: RequestBody): Promise<OrdersResponseData>
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

export async function getOrdersByStatus(orderRequestParameters: PageableRequestParameters, body?: RequestBody): Promise<OrdersResponseData>
{
	const queryParameters = new URLSearchParams(orderRequestParameters);

	const url = VITE_API_URL + "/orders/byStatusPageable?" + queryParameters.toString();

	const response = await fetch(url, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body)
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