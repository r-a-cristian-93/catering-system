import { Order } from "./Order/Order";
import { Pageable } from "./Pageable";

export type PageableResponse = {
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