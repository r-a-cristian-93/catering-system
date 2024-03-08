import { SparkLineChart } from "@mui/x-charts";
import { QueryClient, useQueryClient } from "react-query";
import { IngredientPriceHistory } from "../../../models/Ingredient";
import { useState } from "react";
import { QueryKeysIngredient } from "../../../QueryKeys/QueryKeysIngredient";

type CardPriceTrendProps = {
	ingredientId: number;
}

export default function CardPriceTrend(props: CardPriceTrendProps): JSX.Element
{
	const ingredientId: number = props.ingredientId;
	const queryClient: QueryClient = useQueryClient();

	const [priceHistory] = useState<number[] | null>(
		(queryClient.getQueryData(QueryKeysIngredient.priceHistoryByIngredientId(ingredientId)) as IngredientPriceHistory[])
			.flatMap((each) => each.price)
	);

	return (
		<>
		<div className="card">
		<div className="card-icon">
			<SparkLineChart
				showHighlight
				showTooltip
				data={priceHistory || []}
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