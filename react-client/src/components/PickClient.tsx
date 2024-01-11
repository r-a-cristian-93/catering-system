import { updateOrder } from "../controllers/OrderController";
import { Client, Order } from "../models/Order/Order";

type PickClientProps = {
	orderId: number;
	client: Client;
}

export default function PickClient(props: PickClientProps): JSX.Element
{
	const { orderId, client } = props;

	function handleDoubleClick(): void
	{
		const order: Order = {
			id: orderId,
			client: client,
		} as Order;

		void updateOrder(order);
	}

	return (
		<tr onDoubleClick={handleDoubleClick}>
			<td>{client.name}</td>
			<td>{client.phone || "-"}</td>
		</tr>
	)
}