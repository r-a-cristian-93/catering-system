import { QueryClient, useQueryClient } from "react-query";
import { useState, ChangeEvent } from "react";
import { Ingredient } from "../../../models/Ingredient";
import { updateIngredient } from "../../../controllers/IngredientController";
import { QueryKeysIngredient } from "../../../QueryKeys/QueryKeysIngredient";
import Card from "../../generic/Card/Card";

type RecordNewPricePros = {
	ingredientId: number;
	toggleModalCallback: () => void;
}

export default function RecordNewPrice(props: RecordNewPricePros): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { ingredientId, toggleModalCallback } = props;
	const [ price, setPrice ] = useState<number>(0);

	function handleBlur(): void
	{
		if (price <= 0)
			return;

		const ingredient: Ingredient = {
			id: ingredientId,
			price: price
		} as Ingredient;

		void updateIngredient(ingredient).then(() =>
		{
			void queryClient.invalidateQueries(QueryKeysIngredient.ingredientById(ingredientId));
			void queryClient.invalidateQueries(QueryKeysIngredient.priceHistoryByIngredientId(ingredientId));

			toggleModalCallback();
		});
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>): void
	{
		const { name, value } = event.target;

		if (name === "price")
			setPrice(Number(value));
	}

	return (
		<div className="cards">

			<Card>
				<div>
					<label>Preț nou: </label>
					<input
						name="price"
						type="number"
						className="card-text-medium"
						value={price || ""}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="0"
						min="0"
					></input>
				</div>
			</Card>
		</div>
	)
}