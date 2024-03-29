import { addOrder } from "../../controllers/OrdersController";
import { Order } from "../../models/Order";
import AddButton from "../generic/AddButton/AddButton";

export default function OrdersListControls(): JSX.Element
{
	function handleAddNewOrder(): void
	{
		const order: Order = {} as Order;

		void addOrder(order).then((newOrder) =>
		{
			const path = "/comenzi/" + newOrder.id;

			window.location.pathname = path;
		});
	}

	return (
		<>
			<br />
			<AddButton text="Adauga comanda noua" onClick={handleAddNewOrder} />
		</>
	);
}
