import { SparkLineChart } from "@mui/x-charts";
import { QueryClient, useQueryClient } from "react-query";
import { IngredientPriceHistory } from "../../../models/Ingredient";
import { useState } from "react";
import { QueryKeysIngredient } from "../../../QueryKeys/QueryKeysIngredient";
import Card from "../../generic/Card/Card";
import CardIcon from "../../generic/Card/CardIcon";
import CardDetails from "../../generic/Card/CardDetails";

type CardPriceTrendProps = {
	ingredientId: number;
}

export default function CardPriceTrend(props: CardPriceTrendProps): JSX.Element
{
	const ingredientId: number = props.ingredientId;
	const queryClient: QueryClient = useQueryClient();

	const [ priceHistory ] = useState<number[] | null>(
		(queryClient.getQueryData(QueryKeysIngredient.priceHistoryByIngredientId(ingredientId)) as IngredientPriceHistory[])
			.flatMap((each) => each.price)
	);

	return (
		<>
			<Card>
				<CardIcon>
					<SparkLineChart
						showHighlight
						showTooltip
						data={priceHistory?.reverse() || []}
						width={250}
						height={100}
						colors={[ "black" ]}
					/>
				</CardIcon>
				<CardDetails>
					<div className="card-title">Evolutie pret</div>
				</CardDetails>
			</Card>
		</>
	);
}