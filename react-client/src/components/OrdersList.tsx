import { Order } from "../controllers/OrdersController";
import OrderListItem from "./OrderListItem";

type OrdersListProps = {
	orders: Order[];
};

export default function OrdersList(props: OrdersListProps): JSX.Element
{
	console.log(props);

	return (
		<table className="full">
			<tr>
				<th>ID</th>
				<th>Stare</th>
				<th>Client</th>
				<th>Data preluare</th>
				<th>Termen limita</th>
				<th>Cost ingrediente</th>
			</tr>

			{props.orders.map((order, index) => (
				<OrderListItem key={index} order={order} />
			))}

		</table>
	);
}
