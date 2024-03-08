import { QueryClient, useQueryClient } from "react-query";
import { useState, ChangeEvent } from "react";
import { Ingredient } from "../../../models/Ingredient";
import { updateIngredient } from "../../../controllers/IngredientController";
import { QueryKeysIngredient } from "../../../QueryKeys/QueryKeysIngredient";

type RecordNewPricePros = {
	ingredientId: number;
	toogleModalCallback: () => void;
}

export default function RecordNewPrice(props: RecordNewPricePros): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { ingredientId, toogleModalCallback } = props;
	const  [ price, setPrice ] = useState<number>(0);

	function handleBlur(): void
	{
		const ingredient: Ingredient = {
			id: ingredientId,
			price: price
		} as Ingredient;

		void updateIngredient(ingredient).then(() =>
		{
			void queryClient.invalidateQueries(QueryKeysIngredient.ingredientById(ingredientId));
			void queryClient.invalidateQueries(QueryKeysIngredient.priceHistoryByIngredientId(ingredientId));

			toogleModalCallback();
		});
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>): void
	{
		const { name, value } = event.target;

		if (name === "price")
			setPrice(Number(value));
	}

	return (
		<div className="card-small hover-pointer">
			<div className="card-icon-small">
				<div className={"card-bg "}></div>
			</div>
			<div>
				<label>Preț nou: </label>
				<input
					name = "price"
					type="number"
					className="card-text-medium first-big"
					value={price || ""}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="0"
					min="0"
				></input>
			</div>
		</div>
	)
}