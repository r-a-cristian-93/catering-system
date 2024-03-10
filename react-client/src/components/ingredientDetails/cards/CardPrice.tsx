import * as Formatter from "../../../utils/Formatting"

type CardPriceProps = {
	price: number | null;
}

export default function CardPrice(props: CardPriceProps): JSX.Element
{
	return (
		<>
			<div className="card">
				<div className="card-icon">
					<div className="card-bg img-money"></div>
				</div>
				<div className="card-details">
					<div className="card-title">Pret curent</div>
					<div className="card-text-big">
						{Formatter.formatCurrency(props.price)}
					</div>
				</div>
			</div>
		</>
	);
}