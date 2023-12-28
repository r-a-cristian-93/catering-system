import OrderDetails from "../models/OrderDetails";

const { VITE_API_URL } = import.meta.env;

export default async function getOrderDetails(orderId: number): Promise<OrderDetails>
{
	const url = VITE_API_URL + "/orders/" + orderId.toString();

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		}
	});

	const orderDetailsPromise: Promise<OrderDetails> = response.json().then((json) =>
	{
		const orderDetails: OrderDetails = {} as OrderDetails;
		Object.assign(orderDetails, json);

		return orderDetails;
	});

	return orderDetailsPromise;
}