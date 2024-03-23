import { updateOrder } from "../../../controllers/OrderController";
import { ClientAddress, Order } from "../../../models/Order";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";
import { usePickAddressContext } from "../../../contexts/PickAddressContext";

type PickAddressProps = {
	orderId: number;
	address: ClientAddress;
}

export default function PickAddress(props: PickAddressProps): JSX.Element
{
	const { orderId, address } = props;

	const { order, refetchOrder } = useOrderDetailsContext();

	const {setMarkerPosition} = usePickAddressContext();

	function handleSelect(): void
	{
		const order: Order = {
			id: orderId,
			deliveryAddress: address,
		} as Order;

		void updateOrder(order).then(() =>
		{
			refetchOrder();
			setMarkerPosition([address.latitude, address.longitude])
		});
	}

	return (
		<tr onClick={handleSelect}>
			<td className={order?.deliveryAddress?.id === address.id ? "active-address" : ""}>{address.value}</td>
		</tr>
	)
}
