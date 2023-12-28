
export type Pageable = {
	sort: {
		sorted: boolean;
		unsorted: boolean;
		empty: boolean;
	};
	offset: number;
	pageNumber: number;
	pageSize: number;
	unpaged: boolean;
	paged: boolean;
};
