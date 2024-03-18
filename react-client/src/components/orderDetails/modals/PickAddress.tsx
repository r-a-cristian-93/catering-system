import { updateOrder } from "../../../controllers/OrderController";
import { ClientAddress, Order } from "../../../models/Order";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";

type PickAddressProps = {
	orderId: number;
	address: ClientAddress;
}

export default function PickAddress(props: PickAddressProps): JSX.Element
{
	const { orderId, address } = props;

	const { order, refetchOrder } = useOrderDetailsContext();

	function handleSelect(): void
	{
		const order: Order = {
			id: orderId,
			deliveryAddress: address,
		} as Order;

		void updateOrder(order).then(() =>
		{
			refetchOrder();
		});
	}

	return (
		<tr onClick={handleSelect}>
			<td className={order?.deliveryAddress?.id === address.id ? "active-address" : ""}>{address.value}</td>
		</tr>
	)
}


// useEffect(() =>
// {
// 	void axios.get<NominatimReverseResponse>('https://nominatim.openstreetmap.org/reverse?lat=50&lon=1&format=json').then((response) =>
// 	{
// 		console.log(response.data);
// 	})
// }, [])