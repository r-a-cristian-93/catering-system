export default function OrdersFilterMenu(): JSX.Element
{
	return (
		<div className="filter-menu">
			<div className="filter-container">
				<div className="filter-name">Toate</div>
			</div>
			<div className="filter-container dropdown">
				<div className="filter-name">Stare</div>
				<div className="dropdown-content">
					<a>Preluate</a>
					<a>In lucru</a>
					<a>Livrate</a>
					<a>Anulate</a>
				</div>
			</div>
			<div className="filter-container dropdown">
				<div className="filter-name">Data primire</div>
				<div className="dropdown-content">
					<a>Ultimele 7 zile</a>
					<a>Ultimele 14 zile</a>
					<a>Ultimele 30 zile</a>
				</div>
			</div>
			<div className="filter-container dropdown">
				<div className="filter-name">Data livrare</div>
				<div className="dropdown-content">
					<a>Azi</a>
					<a>Urmatoarele 7 zile</a>
					<a>Urmatoarele 14 zile</a>
					<a>Urmatoarele 30 zile</a>
				</div>
			</div>
		</div>
	);
}
