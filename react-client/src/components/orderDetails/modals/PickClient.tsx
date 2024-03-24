import { updateOrder } from "../../../controllers/OrderController";
import { Client } from "../../../models/Order";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";

type PickClientProps = {
	client: Client;
	toogleModalCallback: () => void;
}

export default function PickClient(props: PickClientProps): JSX.Element
{
	const { order, refetchOrder } = useOrderDetailsContext();
	const { client, toogleModalCallback } = props;

	function handleSelect(): void
	{
		if (order)
			void updateOrder({ ...order, client: client })
				.then(refetchOrder)
				.then(toogleModalCallback);
	}

	return (
		<tr onClick={handleSelect}>
			<td>{client.name}</td>
			<td>{client.phone || "-"}</td>
		</tr>
	)
}