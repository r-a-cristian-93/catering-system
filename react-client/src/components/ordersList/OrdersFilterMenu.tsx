import { OrdersFilter } from "../../pages/OrdersPage";

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
						props.setActiveFilterCallback(OrdersFilter.NONE)
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
						props.setActiveFilterCallback(OrdersFilter.STATUS_PLACED)
					}
					}>Preluate</a>
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilter.STATUS_COOKING)
					}
					}>In lucru</a>
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilter.STATUS_SHIPPED)
					}
					}>Livrate</a>
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilter.STATUS_CANCELED)
					}
					}>Anulate</a>
				</div>
			</div>
			<div className="filter-container dropdown">
				<div className="filter-name">Data primire</div>
				<div className="dropdown-content">
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilter.ORDER_DATE_7)
					}
					}>Ultimele 7 zile</a>
					<a  onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilter.ORDER_DATE_14)
					}
					}>Ultimele 14 zile</a>
					<a  onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilter.ORDER_DATE_30)
					}
					}>Ultimele 30 zile</a>
				</div>
			</div>
			<div className="filter-container dropdown">
				<div className="filter-name">Data livrare</div>
				<div className="dropdown-content">
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilter.DUE_DATE_1)
					}
					}>Azi</a>
					<a onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilter.DUE_DATE_7)
					}
					}>Urmatoarele 7 zile</a>
					<a  onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilter.DUE_DATE_14)
					}
					}>Urmatoarele 14 zile</a>
					<a  onClick={() =>
					{
						props.setActiveFilterCallback(OrdersFilter.DUE_DATE_30)
					}
					}>Urmatoarele 30 zile</a>
				</div>
			</div>
		</div>
	);
}
