import { OrdersFilter, OrdersFilters } from "../ordersFilter/OrdersFilter";
import css from "./OrdersFilterMenu.module.css"
import FilterMenuElement from "./FilterMenuElement";
import FilterMenuElementChild from "./FilterMenuElementChild";
import { useState } from "react";

export type OrdersFilterMenuProps = {
	setActiveFilter: (filter: OrdersFilter) => void
}

type FilterMenuElementStructure = {
	topFilter: OrdersFilter;
	childFilters: OrdersFilter[]
}

const filterMenuStructure: FilterMenuElementStructure[] = [
	{ topFilter: OrdersFilters.ALL, childFilters: [] },
	{
		topFilter: OrdersFilters.BY_STATUS,
		childFilters: [
			OrdersFilters.BY_STATUS_RECEIVED,
			OrdersFilters.BY_STATUS_COOKING,
			OrdersFilters.BY_STATUS_DELIVERED,
			OrdersFilters.BY_STATUS_CANCELED ]
	},
	{
		topFilter: OrdersFilters.BY_RECEIVED_DATE,
		childFilters: [
			OrdersFilters.BY_RECEIVED_DATE_LAST_WEEK,
			OrdersFilters.BY_RECEIVED_DATE_LAST_TWO_WEEKS,
			OrdersFilters.BY_RECEIVED_DATE_LAST_MONTH ]
	},
	{
		topFilter: OrdersFilters.BY_DUE_DATE,
		childFilters: [
			OrdersFilters.BY_DUE_DATE_TODAY,
			OrdersFilters.BY_DUE_DATE_NEXT_WEEK,
			OrdersFilters.BY_DUE_DATE_NEXT_TWO_WEEKS,
			OrdersFilters.BY_DUE_DATE_NEXT_MONTH ]
	},
];

export default function OrdersFilterMenu(props: OrdersFilterMenuProps): JSX.Element
{
	const [activeTopFilterIndex, setActiveTopFilter] = useState<number>(0);

	function setFilter(filter: OrdersFilter, topElementIndex: number):void
	{
		if (filter.requestFunction)
		{
			setActiveTopFilter(topElementIndex);
			props.setActiveFilter(filter);
		}
	}

	return (
		<div className={css.filter_menu}>
			{
				filterMenuStructure.map((filterStructure, topElementIndex) =>
					<FilterMenuElement
						key={topElementIndex}
						topElementIndex={topElementIndex}
						setActiveFilter={setFilter}
						filter={filterStructure.topFilter}
						className={topElementIndex === activeTopFilterIndex ? css.active : ""}
					>
						{
							filterStructure.childFilters.map((filter, index) =>
								<FilterMenuElementChild
									key={index}
									topElementIndex={topElementIndex}
									setActiveFilter={setFilter}
									filter={filter}
								/>
							)
						}
					</FilterMenuElement>
				)
			}
		</div>
	);
}
