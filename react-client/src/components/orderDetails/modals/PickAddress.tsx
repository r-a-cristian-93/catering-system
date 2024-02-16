import { QueryClient, useQueryClient } from "react-query";
import { updateOrder } from "../../../controllers/OrderController";
import { ClientAddress, Order } from "../../../models/Order";
import { QueryKeysOrder } from "../../../QueryKeys/QueryKeysOrder";

type PickAddressProps = {
	orderId: number;
	address: ClientAddress;
	toogleModalCallback: () => void;
}

export default function PickAddress(props: PickAddressProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { orderId, address, toogleModalCallback } = props;

	function handleSelect(): void
	{
		const order: Order = {
			id: orderId,
			deliveryAddress: address,
		} as Order;

		void updateOrder(order).then((order) =>
		{
			void queryClient.invalidateQueries(QueryKeysOrder.orderById(order.id));

			toogleModalCallback();
		});
	}

	return (
		<tr onClick={handleSelect}>
			<td>{address.value}</td>
		</tr>
	)
}