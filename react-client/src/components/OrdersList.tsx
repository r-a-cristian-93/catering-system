import Order from "../models/Order";
import OrderComponent from "./OrderComponent";

type OrdersListProps = {
	orders: Order[];
};

export default function OrdersList(props: OrdersListProps): JSX.Element
{
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
				<OrderComponent key={index} order={order} />
			))}

		</table>
	);
}