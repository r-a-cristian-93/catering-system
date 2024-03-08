import { OrderItem } from "../models/Order";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export async function getOrderItems(orderId: number): Promise<OrderItem[]>
{
    const url = VITE_API_URL + "/orders/" + orderId + "/details";

    const response = await axios.get<OrderItem[]>(url, { withCredentials: true });

    return response.data;
}

export async function updateOrderItem(orderItem: OrderItem): Promise<OrderItem>
{
    const url: string = VITE_API_URL + "/orders/" + orderItem.orderId + "/details";

    const response = await axios.put<OrderItem>(url, orderItem, { withCredentials: true});

    return response.data;
}

export async function deleteOrderItem(orderItemId: number): Promise<boolean>
{
    const url: string = VITE_API_URL + "/orders/details" ;

    const response = await axios.delete<boolean>(url, {
        withCredentials: true,
        params: { detailsId: orderItemId }
    });

    return response.data;
}

export async function addOrderItem(orderItem: OrderItem): Promise<OrderItem>
{
    const url: string = VITE_API_URL + "/orders/" + orderItem.orderId + "/details";

    const response = await axios.post<OrderItem>(url, orderItem, { withCredentials: true });

    return response.data;
}