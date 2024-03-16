import { OrdersFilter } from "../ordersFilter/OrdersFilter";
import css from "./OrdersFilterMenu.module.css"

export type FilterMenuElementProps = React.HTMLProps<HTMLDivElement> & {
	filter: OrdersFilter;
	topElementIndex: number;
	setActiveFilter: (filter: OrdersFilter, topElementIndex: number) => void
}

export default function FilterMenuElement(props: FilterMenuElementProps): JSX.Element
{
	const { setActiveFilter, filter, topElementIndex } = props;

	function handleOnClick(): void
	{
		setActiveFilter(filter, topElementIndex);
	}

	return (
		<div className={css.filter_container + " " + css.dropdown + " " + props.className} onClick={handleOnClick}>
			<div className={css.filter_name}>{filter.displayName}</div>
			<div className={css.dropdown_content}>
				{props.children}
			</div>
		</div>
	)
}