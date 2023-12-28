const { VITE_API_URL } = import.meta.env;

export type Client =
{
	id: number;
	name: string;
	phone: string;
};

export type Status =
{
	name: string;
};

export type DeliveryAddress =
{
	id: number;
	value: string;
};

export type OrderDetails =
{
	id: number;
	client: Client;
	status: Status;
	ingCost: number;
	placementDate: string;
	dueDate: string;
	supplyDate: string;
	productionDate: string;
	preparingDate: string;
	shippingDate: string;
	cancelDate: string | null;
	shoppingListId: number;
	deliveryAddress: DeliveryAddress;
};

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