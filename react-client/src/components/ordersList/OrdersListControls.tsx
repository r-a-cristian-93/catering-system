import { addOrder } from "../../controllers/OrdersController";
import { Order } from "../../models/Order";

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
			<button className="button" type="button" onClick={handleAddNewOrder}>
				+ Adauga comanda noua
			</button>
		</>
	);
}
