import { useEffect, useState } from "react";
import getOrderDetails, { OrderDetails } from "../controllers/OrderDetailsController";

export default function OrderDetailsPage(): JSX.Element
{
	const queryParameters = new URLSearchParams(window.location.search)
	const orderId: number = Number(queryParameters.get("id"));

	const [orderDetails, setOrderDetails] = useState<OrderDetails>({} as OrderDetails);

	useEffect(() =>
	{
		void getOrderDetails(orderId).then((newOrderDetails) =>
		{
			setOrderDetails(newOrderDetails);
		});
	}, [])

	return <>{JSON.stringify(orderDetails)}</>
}