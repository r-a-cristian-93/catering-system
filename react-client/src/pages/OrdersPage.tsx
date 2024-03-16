import { useEffect, useState, useRef } from "react";
import OrdersFilterMenu from "../components/ordersList/OrdersFilterMenu/OrdersFilterMenu.tsx";
import OrdersList from "../components/ordersList/OrdersList.tsx";
import { RequestBody, getOrders } from "../controllers/OrdersController";
import { PageableRequestParameters } from "../models/Pageable.tsx";
import { Order } from "../models/Order.tsx";
import OrdersListControls from "../components/ordersList/OrdersListControls.tsx";
import Pager, { PagerArgs } from "../components/generic/Pager/Pager.tsx";
import { OrderFilterRequestFunction, OrdersFilter } from "../components/ordersList/ordersFilter/OrdersFilter.tsx";
import SimplePage from "../components/generic/SimplePage/SimplePage.tsx";

export default function OrdersPage(): JSX.Element
{
	const ordersRequestBody = useRef<RequestBody | null>({ name: "anulata" });
	const ordersRequestFunction = useRef<OrderFilterRequestFunction | null>(getOrders);
	const ordersRequestParameters = useRef<PageableRequestParameters | null>({
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
		if (ordersRequestFunction.current && ordersRequestParameters.current && ordersRequestBody.current)
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
	}

	function setActivePage(activePage: number): void
	{
		if (ordersRequestParameters.current)
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
		<SimplePage title="Comenzi" imagePath="/img/orders.png">
			<OrdersFilterMenu setActiveFilter={setActiveFilter} />
			<OrdersList orders={orders} />
			<Pager pagerArgs={pagerArgs} />
			<OrdersListControls />
		</SimplePage>
	);
}
