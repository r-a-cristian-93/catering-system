import { Order, Status } from "../models/Order";
import { PageableRequestParameters } from "../models/Pageable";
import { OrdersResponseData } from "../models/Order";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export interface RequestBody
{}

export interface OrderStatusRequestBody extends RequestBody
{
	status: Status;
}

export async function getOrders(parameters?: PageableRequestParameters, body?: RequestBody): Promise<OrdersResponseData>
{
	return genericRequest<OrdersResponseData>(
		"GET",
		"/orders/allPageable",
		new URLSearchParams(parameters),
		body);
}


export async function getOrdersByStatus(parameters?: PageableRequestParameters, body?: RequestBody): Promise<OrdersResponseData>
{
	return genericRequest<OrdersResponseData>(
		"POST",
		"/orders/byStatusPageable",
		new URLSearchParams(parameters),
		body);
}

export async function getOrdersByDueDate(parameters?: PageableRequestParameters, body?: RequestBody): Promise<OrdersResponseData>
{
	return genericRequest<OrdersResponseData>(
		"POST",
		"/orders/betweenDueDatesPageable",
		new URLSearchParams(parameters),
		body);
}

export async function getOrdersByReceivedDate(parameters?: PageableRequestParameters, body?: RequestBody): Promise<OrdersResponseData>
{
	return genericRequest<OrdersResponseData>(
		"POST",
		"/orders/betweenOrderDatesPageable",
		new URLSearchParams(parameters),
		body);
}

export async function genericRequest<D extends object>(method: string, path: string, params?: URLSearchParams, body?: RequestBody): Promise<D>
{
	const queryParameters = new URLSearchParams(params);

	const url = VITE_API_URL + path + "?" + queryParameters.toString();

	const requestInit: RequestInit = {
		method: method,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	}

	if (method === "POST")
		requestInit.body = JSON.stringify(body);

	const response = await fetch(url, requestInit);

	const promise: Promise<D> = response.json().then((json) =>
	{
		const responseData: D = {} as D;

		Object.assign(responseData, json);

		return responseData;
	});

	return promise;
}

export async function addOrder(order?: Order): Promise<Order>
{
	const url = VITE_API_URL + "/orders";

	const response = await axios.post<Order>(url, order || {}, {withCredentials: true})

	return response.data;
}