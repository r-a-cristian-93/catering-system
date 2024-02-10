import { OrdersFilter, OrdersFilters } from "./ordersFilter/OrdersFilter";

type OrdersFilterMenuProps = {
	setActiveFilterCallback: (filter: OrdersFilter) => void
}

export default function OrdersFilterMenu(props: OrdersFilterMenuProps): JSX.Element
{
	return (
		<div className="filter-menu">
			<div className="filter-container">
				<div className="filter-name" onClick={() =>
				{
					props.setActiveFilterCallback(OrdersFilters.ALL)
				}
				}>
					Toate
				</div>
			</div>
			<div className="filter-container dropdown">
				<div className="filter-name">Stare</div>
				<div className="dropdown-content">
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilters.BY_STATUS_RECEIVED)
					}
					}>Preluate</a>
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilters.BY_STATUS_COOKING)
					}
					}>In lucru</a>
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilters.BY_STATUS_DELIVERED)
					}
					}>Livrate</a>
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilters.BY_STATUS_CANCELED)
					}
					}>Anulate</a>
				</div>
			</div>
			<div className="filter-container dropdown">
				<div className="filter-name">Data primire</div>
				<div className="dropdown-content">
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilters.BY_RECEIVED_DATE_LAST_WEEK)
					}
					}>Ultimele 7 zile</a>
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilters.BY_RECEIVED_DATE_LAST_TWO_WEEKS)
					}
					}>Ultimele 14 zile</a>
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilters.BY_RECEIVED_DATE_LAST_MONTH)
					}
					}>Ultimele 30 zile</a>
				</div>
			</div>
			<div className="filter-container dropdown">
				<div className="filter-name">Data livrare</div>
				<div className="dropdown-content">
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilters.BY_DUE_DATE_TODAY)
					}
					}>Azi</a>
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilters.BY_DUE_DATE_NEXT_WEEK)
					}
					}>Urmatoarele 7 zile</a>
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilters.BY_DUE_DATE_NEXT_TWO_WEEKS)
					}
					}>Urmatoarele 14 zile</a>
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilters.BY_DUE_DATE_NEXT_MONTH)
					}
					}>Urmatoarele 30 zile</a>
				</div>
			</div>
		</div>
	);
}
