import { useEffect, useState, useRef } from "react";
import OrdersFilterMenu from "../components/ordersList/OrdersFilterMenu.tsx";
import OrdersList from "../components/ordersList/OrdersList.tsx";
import { RequestBody, getOrders } from "../controllers/OrdersController";
import { PageableRequestParameters } from "../models/Pageable.tsx";
import { Order, OrdersResponseData } from "../models/Order.tsx";
import OrdersListControls from "../components/ordersList/OrdersListControls.tsx";
import Pager, { PagerArgs } from "../components/Pager.tsx";
import { OrdersFilter } from "../components/ordersList/ordersFilter/OrdersFilter.tsx";

export default function OrdersPage(): JSX.Element
{
	const ordersRequestBody = useRef<RequestBody>({ name: "anulata" });
	const ordersRequestFunction = useRef<(params: PageableRequestParameters, body?: RequestBody) => Promise<OrdersResponseData>>(getOrders);
	const ordersRequestParameters = useRef<PageableRequestParameters>({
		page: "0",
		size: "4",
		prop: "dueDate",
		dir: "DESC",
	});

	const [ orders, setOrders ] = useState<Order[] | null>(null);
	const [ pagerArgs, setPagerArgs ] = useState<PagerArgs>({} as PagerArgs);

	useEffect(() =>
	{
		requestOrders();
	}, []);

	function requestOrders(): void
	{
		void ordersRequestFunction.current(ordersRequestParameters.current, ordersRequestBody.current).then((ordersResponseData) =>
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

	function setActiveFilter(filter: OrdersFilter): void
	{
		ordersRequestFunction.current = filter.requestFunction;
		ordersRequestBody.current = filter.requestBody;

		requestOrders();
	}

	return (
		<div className="box">
			<div className="box-header">
				<img height="100px" src="img/orders.png" />
				<h1 className="box-title">Comenzi</h1>
			</div>
			<div className="box-content" id="order-table">
				<OrdersFilterMenu setActiveFilterCallback={setActiveFilter} />
				<OrdersList orders={orders} />
				<Pager pagerArgs={pagerArgs} />
				<OrdersListControls />
			</div>
		</div>
	);
}
