import { RequestBody, getOrders, getOrdersByDueDate, getOrdersByReceivedDate, getOrdersByStatus } from "../../../controllers/OrdersController";
import { OrdersResponseData } from "../../../models/Order";
import { PageableRequestParameters } from "../../../models/Pageable";

const dateMillisToday: number = new Date().getTime();
const dateMillisLastWeek: number = new Date().setDate(new Date().getDate() - 7);
const dateMillisLastTwoWeeks: number = new Date().setDate(new Date().getDate() - 14);
const dateMillisLastMonth: number = new Date().setDate(new Date().getDate() - 30);

const dateMillisNextWeek: number = new Date().setDate(new Date().getDate() + 7);
const dateMillisNextTwoWeeks: number = new Date().setDate(new Date().getDate() + 14);
const dateMillisNextMonth: number = new Date().setDate(new Date().getDate() + 30);

export type OrderFilterRequestFunction = (params: PageableRequestParameters, body?: RequestBody) => Promise<OrdersResponseData>;

export class OrdersFilter
{
	requestFunction: OrderFilterRequestFunction | null;
	requestBody: RequestBody | null;
	displayName: string;

	constructor(
		requestFunction: OrderFilterRequestFunction | null,
		requestBody: RequestBody | null,
		displayName: string
	)
	{
		this.requestFunction = requestFunction;
		this.requestBody = requestBody;
		this.displayName = displayName;
	}

}

export const OrdersFilters = {
	ALL: new OrdersFilter(
		getOrders,
		{},
		"Toate"
	),
	BY_STATUS: new OrdersFilter(
		null,
		null,
		"Stare"
	),
	BY_STATUS_RECEIVED: new OrdersFilter(
		getOrdersByStatus,
		{ name: "preluata" },
		"Preluată"
	),
	BY_STATUS_SUPPLIED: new OrdersFilter(
		getOrdersByStatus,
		{ name: "aprovizionata" },
		"Aprovizionată"
	),
	BY_STATUS_COOKING: new OrdersFilter(
		getOrdersByStatus,
		{ name: "preparata" },
		"Preparată"
	),
	BY_STATUS_READY: new OrdersFilter(
		getOrdersByStatus,
		{ name: "pregatita" },
		"Pregătită"
	),
	BY_STATUS_DELIVERED: new OrdersFilter(
		getOrdersByStatus,
		{ name: "expediata" },
		"Livrată"
	),
	BY_STATUS_CANCELED: new OrdersFilter(
		getOrdersByStatus,
		{ name: "anulata" },
		"Anulată"
	),
	BY_DUE_DATE: new OrdersFilter(
		null,
		null,
		"Dată livrare"
	),
	BY_DUE_DATE_TODAY: new OrdersFilter(
		getOrdersByDueDate,
		{ first: dateMillisToday, last: dateMillisToday },
		"Azi"
	),
	BY_DUE_DATE_NEXT_WEEK: new OrdersFilter(
		getOrdersByDueDate,
		{ first: dateMillisToday, last: dateMillisNextWeek },
		"Următoarele 7 zile"
	),
	BY_DUE_DATE_NEXT_TWO_WEEKS: new OrdersFilter(
		getOrdersByDueDate,
		{ first: dateMillisToday, last: dateMillisNextTwoWeeks },
		"Următoarele 14 zile"
	),
	BY_DUE_DATE_NEXT_MONTH: new OrdersFilter(
		getOrdersByDueDate,
		{ first: dateMillisToday, last: dateMillisNextMonth },
		"Următoarele 30 de zile"
	),
	BY_RECEIVED_DATE: new OrdersFilter(
		null,
		null,
		"Dată primire"
	),
	BY_RECEIVED_DATE_LAST_WEEK: new OrdersFilter(
		getOrdersByReceivedDate,
		{ first: dateMillisLastWeek, last: dateMillisToday },
		"Ultimele 7 zile"
	),
	BY_RECEIVED_DATE_LAST_TWO_WEEKS: new OrdersFilter(
		getOrdersByReceivedDate,
		{ first: dateMillisLastTwoWeeks, last: dateMillisToday },
		"Ultimele 14 zile"
	),
	BY_RECEIVED_DATE_LAST_MONTH: new OrdersFilter(
		getOrdersByReceivedDate,
		{ first: dateMillisLastMonth, last: dateMillisToday },
		"Ultimele 30 de zile"
	)
};

