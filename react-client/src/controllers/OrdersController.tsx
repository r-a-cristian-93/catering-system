import { Order } from "../models/Order";
import { Pageable } from "../models/Pageable";

const { VITE_API_URL } = import.meta.env;

export type OrderRequestParameters =
{
	page: string;
	size: string;
	prop: string;
	dir: string;
}

export type OrdersResponseData =
{
	content: Order[];
	pageable: Pageable;
	totalPages: number;
	totalElements: number;
	last: boolean;
	number: number;
	sort: {
		sorted: boolean;
		unsorted: boolean;
		empty: boolean;
	};
	size: number;
	numberOfElements: number;
	first: boolean;
	empty: boolean;
}

export default async function getOrders(orderRequestParameters: OrderRequestParameters): Promise<OrdersResponseData>
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
