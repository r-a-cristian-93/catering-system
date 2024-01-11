import { useEffect, useState, useRef } from "react";
import OrdersFilterMenu from "../components/OrdersFilterMenu";
import OrdersList from "../components/OrdersList";
import { getOrders } from "../controllers/OrdersController";
import { PageableRequestParameters } from "../models/Pageable.tsx";
import { Order } from "../models/Order/Order.tsx";
import OrdersListControls from "../components/OrdersListControls.tsx";
import { PagerArgs } from "../components/Pager.tsx";

export default function OrdersPage(): JSX.Element
{
	const ordersRequestParameters = useRef<PageableRequestParameters>({
		page: "0",
		size: "4",
		prop: "dueDate",
		dir: "DESC",
	});

	const [ orders, setOrders ] = useState<Order[]>([]);
	const [ pagerArgs, setPagerArgs ] = useState<PagerArgs>({} as PagerArgs);

	useEffect(() =>
	{
		requestOrders();
	}, []);

	function requestOrders(): void
	{
		void getOrders(ordersRequestParameters.current).then((ordersResponseData) =>
		{
			setOrders(ordersResponseData.content);
			setPagerArgs({
				activePage: ordersResponseData.pageable.pageNumber,
				totalPages: ordersResponseData.totalPages,
				setActivePageCallback: setActivePage,
			});
		});
	}

	function setActivePage(activePage: number): void
	{
		ordersRequestParameters.current.page = activePage.toString();

		requestOrders();
	}

	return (
		<div className="box">
			<div className="box-content" id="order-table">
				<OrdersFilterMenu />
				<OrdersList orders={orders} />
				<OrdersListControls pagerArgs={pagerArgs} />
			</div>
		</div>
	);
}
