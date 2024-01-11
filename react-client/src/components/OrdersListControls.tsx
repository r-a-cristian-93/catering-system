import { addOrder } from "../controllers/OrdersController";
import { Order } from "../models/Order/Order";
import Pager from "./Pager";
import { PagerProps } from "./Pager";

export default function OrdersListControls(props: PagerProps): JSX.Element
{
	function handleAddNewOrder(): void
	{
		const order: Order = {} as Order;

		void addOrder(order).then((newOrder) =>
		{
			const path = "/comenzi/detalii_comanda/" + newOrder.id;

			window.location.pathname = path;
		});
	}

	return (
		<>
			<Pager pagerArgs={props.pagerArgs} />
			<br />
			<button className="button" type="button" onClick={handleAddNewOrder}>
				+ Adauga comanda noua
			</button>
		</>
	);
}
