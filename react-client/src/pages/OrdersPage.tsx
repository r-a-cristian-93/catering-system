import { useEffect, useState, useRef } from "react";
import OrdersFilterMenu from "../components/ordersList/OrdersFilterMenu.tsx";
import OrdersList from "../components/ordersList/OrdersList.tsx";
import { RequestBody, getOrders, getOrdersByDueDate, getOrdersByStatus } from "../controllers/OrdersController";
import { PageableRequestParameters } from "../models/Pageable.tsx";
import { Order, OrdersResponseData } from "../models/Order.tsx";
import OrdersListControls from "../components/ordersList/OrdersListControls.tsx";
import { PagerArgs } from "../components/Pager.tsx";

export enum OrdersFilter
{
	NONE,
	STATUS_PLACED,
	STATUS_SUPPLIED,
	STATUS_COOKING,
	STATUS_READY,
	STATUS_SHIPPED,
	STATUS_CANCELED,
	ORDER_DATE_7,
	ORDER_DATE_14,
	ORDER_DATE_30,
	DUE_DATE_1,
	DUE_DATE_7,
	DUE_DATE_14,
	DUE_DATE_30,
}

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
		switch (filter)
		{
			case OrdersFilter.STATUS_PLACED:
				ordersRequestFunction.current = getOrdersByStatus;
				ordersRequestBody.current = { name: "preluata" };
				break;
			case OrdersFilter.STATUS_SUPPLIED:
				ordersRequestFunction.current = getOrdersByStatus;
				ordersRequestBody.current = { name: "aprovizionata" };
				break;
			case OrdersFilter.STATUS_COOKING:
				ordersRequestFunction.current = getOrdersByStatus;
				ordersRequestBody.current = { name: "preparata" };
				break;
			case OrdersFilter.STATUS_READY:
				ordersRequestFunction.current = getOrdersByStatus;
				ordersRequestBody.current = { name: "pregatita" };
				break;
			case OrdersFilter.STATUS_SHIPPED:
				ordersRequestFunction.current = getOrdersByStatus;
				ordersRequestBody.current = { name: "expediata" };
				break;
			case OrdersFilter.STATUS_CANCELED:
				ordersRequestFunction.current = getOrdersByStatus;
				ordersRequestBody.current = { name: "anulata" };
				break;
			case OrdersFilter.DUE_DATE_1:
			case OrdersFilter.DUE_DATE_7:
			case OrdersFilter.DUE_DATE_14:
			case OrdersFilter.DUE_DATE_30:
				ordersRequestFunction.current = getOrdersByDueDate;
				ordersRequestBody.current = { first: new Date("2024-02-01").getTime(), last: new Date("2030-01-01").getTime() };
				break;
			case OrdersFilter.ORDER_DATE_7:
				ordersRequestFunction.current = getOrders;
				break;
			case OrdersFilter.NONE:
			default:
				ordersRequestFunction.current = getOrders;
				break;
		}

		requestOrders();
	}

	return (
		<div className="box">
			<div className="box-content" id="order-table">
				<OrdersFilterMenu setActiveFilterCallback={setActiveFilter} />
				{
					orders && <OrdersList orders={orders} />
				}
				<OrdersListControls pagerArgs={pagerArgs} />
			</div>
		</div>
	);
}
