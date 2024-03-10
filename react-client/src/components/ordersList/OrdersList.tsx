import { Order } from "../../models/Order";
import TableList from "../generic/TableList/TableList";
import OrderComponent from "./OrderComponent";

type OrdersListProps = {
	orders: Order[] | null;
};

export default function OrdersList(props: OrdersListProps): JSX.Element
{
	return (
		<TableList header={[ "ID", "Stare", "Client", "Data preluare", "Termen limita", "Cost ingrediente" ]}>
			{props.orders?.map((order) => (
				<OrderComponent key={order.id} order={order} />
			))}
		</TableList>
	);
}
