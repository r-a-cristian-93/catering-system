import OrderRequestParameters from "../models/OrderRequestParameters";
import OrdersResponseData from "../models/OrdersResponseData";

const { VITE_API_URL } = import.meta.env;

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
