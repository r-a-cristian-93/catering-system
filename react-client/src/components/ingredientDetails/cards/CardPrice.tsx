import * as Formatter from "../../../utils/Formatting"
import Card from "../../generic/Card/Card";
import CardDetails from "../../generic/Card/CardDetails";
import CardIcon from "../../generic/Card/CardIcon";

type CardPriceProps = {
	price: number | null;
}

export default function CardPrice(props: CardPriceProps): JSX.Element
{
	return (
		<>
			<Card>
				<CardIcon>
					<div className="card-bg img-money"></div>
				</CardIcon>
				<CardDetails>
					<div className="card-title">Pret curent</div>
					<div className="card-text-big">
						{Formatter.formatCurrency(props.price)}
					</div>
				</CardDetails>
			</Card>
		</>
	);
}