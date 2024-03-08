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
			<button className="add-button" type="button" onClick={handleAddNewOrder}>
				<div className="add-button-text">Adauga comanda noua</div>
				<div className="add-button-dot">+</div>
			</button>
		</>
	);
}
