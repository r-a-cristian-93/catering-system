import { SparkLineChart } from "@mui/x-charts";

type CardPriceTrendProps = {
	ingredientId: number | null;
}

export default function CardPriceTrend(props: CardPriceTrendProps): JSX.Element
{
	return (
		<>
		<div className="card">
		<div className="card-icon">
			<SparkLineChart
				showHighlight
				showTooltip
				data={[0,1,6,3,4]}
				width={250}
				height={100}
				colors={["black"]}
			/>
			</div>
			<div className="card-details card-details-absolute">
				<div className="card-title">Evolutie pret</div>
			</div>
		</div>
		</>
	);
}