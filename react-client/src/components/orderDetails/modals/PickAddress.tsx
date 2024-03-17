import { QueryClient, useQueryClient } from "react-query";
import { updateOrder } from "../../../controllers/OrderController";
import { ClientAddress, Order } from "../../../models/Order";
import { QueryKeysOrder } from "../../../QueryKeys/QueryKeysOrder";
import { useState } from "react";
import { useOrderDetailsContext } from "../../../pages/OrderDetailsPage";

type PickAddressProps = {
	orderId: number;
	address: ClientAddress;
	toggleModalCallback: () => void;
}

export default function PickAddress(props: PickAddressProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { orderId, address, toggleModalCallback } = props;

	const order = useOrderDetailsContext();

	function handleSelect(): void
	{
		const order: Order = {
			id: orderId,
			deliveryAddress: address,
		} as Order;

		void updateOrder(order).then((order) =>
		{
			void queryClient.invalidateQueries<Order>(QueryKeysOrder.orderById(order.id))
		});
	}

	return (
		<tr onClick={handleSelect}>
			<td className={order?.deliveryAddress?.id === address.id ? "active-address" : ""}>{address.value}</td>
		</tr>
	)
}