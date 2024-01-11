
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

export type PageableRequestParameters = {
	page: string;
	size: string;
	prop: string;
	dir: string;
};

export type PageableResponse = {
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

