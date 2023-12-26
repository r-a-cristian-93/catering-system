import { useEffect, useState } from "react";
import OrdersFilterMenu from "../components/OrdersFilterMenu";
import OrdersList from "../components/OrdersList";
import getOrders from "../controllers/OrdersController";
import { OrderRequestParameters, Order } from "../controllers/OrdersController.tsx";
import OrdersListControls from "../components/OrdersListControls.tsx";

export default function OrdersPage(): JSX.Element
{
	const ordersRequestParameters: OrderRequestParameters = {
		page: "0",
		size: "10",
		prop: "dueDate",
		dir: "ASC",
	};

	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() =>
	{
		void getOrders(ordersRequestParameters).then((ordersResponseData) =>
		{
			setOrders(ordersResponseData.content);
		});
	}, []);

	return (
		<div className="box">
			<div className="box-content" id="order-table">
				<OrdersFilterMenu />
				<OrdersList orders={orders} />
				<OrdersListControls />
			</div>
		</div>
	);
}