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

export class OrdersFilter
{
	constructor(
		requestFunction: (params: PageableRequestParameters, body?: RequestBody) => Promise<OrdersResponseData>,
		requestBody: RequestBody
	)
	{
		this.requestFunction = requestFunction;
		this.requestBody = requestBody;

	}
	requestFunction: (params: PageableRequestParameters, body?: RequestBody) => Promise<OrdersResponseData>;
	requestBody: RequestBody;
}

export const OrdersFilters = {
	ALL: new OrdersFilter(
		getOrders,
		{}
	),
	BY_STATUS_RECEIVED: new OrdersFilter(
		getOrdersByStatus,
		{ name: "preluata" }
	),
	BY_STATUS_SUPPLIED: new OrdersFilter(
		getOrdersByStatus,
		{ name: "aprovizionata" }
	),
	BY_STATUS_COOKING: new OrdersFilter(
		getOrdersByStatus,
		{ name: "preparata" }
	),
	BY_STATUS_READY: new OrdersFilter(
		getOrdersByStatus,
		{ name: "pregatita" }
	),
	BY_STATUS_DELIVERED: new OrdersFilter(
		getOrdersByStatus,
		{ name: "expediata" }
	),
	BY_STATUS_CANCELED: new OrdersFilter(
		getOrdersByStatus,
		{ name: "anulata" }
	),
	BY_DUE_DATE_TODAY: new OrdersFilter(
		getOrdersByDueDate,
		{ first: dateMillisToday, last: dateMillisToday }
	),
	BY_DUE_DATE_NEXT_WEEK: new OrdersFilter(
		getOrdersByDueDate,
		{ first: dateMillisToday, last: dateMillisNextWeek }
	),
	BY_DUE_DATE_NEXT_TWO_WEEKS: new OrdersFilter(
		getOrdersByDueDate,
		{ first: dateMillisToday, last: dateMillisNextTwoWeeks }
	),
	BY_DUE_DATE_NEXT_MONTH: new OrdersFilter(
		getOrdersByDueDate,
		{ first: dateMillisToday, last: dateMillisNextMonth }
	),
	BY_RECEIVED_DATE_LAST_WEEK: new OrdersFilter(
		getOrdersByReceivedDate,
		{ first: dateMillisLastWeek, last: dateMillisToday }
	),
	BY_RECEIVED_DATE_LAST_TWO_WEEKS: new OrdersFilter(
		getOrdersByReceivedDate,
		{ first: dateMillisLastTwoWeeks, last: dateMillisToday }
	),
	BY_RECEIVED_DATE_LAST_MONTH: new OrdersFilter(
		getOrdersByReceivedDate,
		{ first: dateMillisLastMonth, last: dateMillisToday }
	)
};

