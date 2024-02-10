import { QueryClient, useQueryClient } from "react-query";
import { updateOrder } from "../../../controllers/OrderController";
import { Client, ClientAddress, Order } from "../../../models/Order";
import { QueryKeysOrder } from "../../../QueryKeys/QueryKeysOrder";
import { getAddresses } from "../../../controllers/AddressControllere";

type PickClientProps = {
	orderId: number;
	client: Client;
	toogleModalCallback: () => void;
}

export default function PickClient(props: PickClientProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { orderId, client, toogleModalCallback } = props;

	function handleDoubleClick(): void
	{
		const order: Order = {
			id: orderId,
			client: client,
		} as Order;

		void getAddresses(client.id).then((addresses: ClientAddress[]) =>
		{
			if (addresses.length > 0)
				order.deliveryAddress = addresses[0];
			else
				order.deliveryAddress = null;

			void updateOrder(order).then((order) =>
			{
				void queryClient.invalidateQueries(QueryKeysOrder.orderById(order.id));

				toogleModalCallback();
			});
		});
	}

	return (
		<tr onDoubleClick={handleDoubleClick}>
			<td>{client.name}</td>
			<td>{client.phone || "-"}</td>
		</tr>
	)
}