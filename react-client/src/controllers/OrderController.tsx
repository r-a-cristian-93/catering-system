import { Order } from "../models/Order";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export async function getOrder(orderId: number): Promise<Order>
{
	const url = VITE_API_URL + "/orders/" + orderId.toString();

	const response = await axios.get<Order>(url, {withCredentials: true});

	return response.data;
}

export async function setNextOrderState(orderId: number): Promise<Order>
{
	const url = VITE_API_URL + "/orders/" + orderId + "/nextstep";

	const response = await axios.put<Order>(url, null, { withCredentials: true });

	return response.data;
}

export async function updateOrder(order: Order): Promise<Order>
{
	const url = VITE_API_URL + "/orders/" + order.id;

	const response = await axios.put<Order>(url, order, { withCredentials: true });

	return response.data;
}
