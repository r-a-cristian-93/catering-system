import { Order } from "../models/Order";
import Pageable from "../models/Pageable";

type OrdersResponseData = {
	content: Order[];
	pageable: Pageable;
	totalPages: number;
	totalElements: number;
	last: boolean;
	number: number;
	sort: {
		sorted: boolean;
		unsorted: boolean;
		empty: boolean;
	};
	size: number;
	numberOfElements: number;
	first: boolean;
	empty: boolean;
};

export default OrdersResponseData;
