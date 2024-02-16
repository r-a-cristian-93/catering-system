import * as Formatter from "../../../utils/Formatting"

type CardClientProps = {
	cost: number | null;
}

export default function CardCost(props: CardClientProps): JSX.Element
{
	return (
		<>
		<div className="card">
			<div className="card-icon">
				<div className="card-bg img-money"></div>
			</div>
			<div className="card-details">
				<div className="card-title">Cost ingrediente</div>
				<div className="card-text-big first-big">
					{Formatter.formatCurrency(props.cost)}
				</div>
			</div>
		</div>
		</>
	);
}