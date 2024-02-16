import * as Formatter from "../../utils/Formatting";
import { ChangeEvent } from "react";
import InputScrollBlocking from "../InputScrollBlocking";
import { RecipeItem } from "../../models/Recipe";
import { deleteRecipeItem, updateRecipeItem } from "../../controllers/RecipeItemsController";

type RecipeItemComponentProps = {
	recipeItem: RecipeItem;
	changeCallback: (orderItem: RecipeItem) => void;
	deleteCallback: (orderItem: RecipeItem) => void;
};

export default function RecipeItemComponent(props: RecipeItemComponentProps): JSX.Element
{
	const recipeItem = props.recipeItem;
	const { changeCallback, deleteCallback } = props;

	const costTotal = recipeItem.ingredient.price * recipeItem.quantity;

	function handleChange(event: ChangeEvent<HTMLInputElement>): void
	{
		const { name, value } = event.target;

		if (name === "quantity")
		{
			const newItem = {
				...recipeItem,
				[ name ]: Number(value),
			};

			changeCallback(newItem);
		}
	}

	function handleOnBlur(): void
	{
		void updateRecipeItem(recipeItem);
	}

	function handleDelete(): void
	{
		void deleteRecipeItem(recipeItem).then((isItemDeleted) =>
		{
			if (isItemDeleted) deleteCallback(recipeItem);
		});
	}

	return (
		<tr id="det_8" className="font-size-120">
			<td>{recipeItem.ingredient.name}</td>
			<td>
				<InputScrollBlocking
					name="quantity"
					type="number"
					value={recipeItem.quantity}
					onChange={handleChange}
					onBlur={handleOnBlur}
					placeholder="0"
					min="0.0"
				/>
				<span style={{width : "50px", display: "inline-block", textAlign: "left"}}>{recipeItem.ingredient.unit.name} </span>
			</td>
			<td>{Formatter.formatCurrency(recipeItem.ingredient.price) + " / " + recipeItem.ingredient.unit.name}</td>
			<td>{Formatter.formatCurrency(costTotal)}</td>
			<td>
				<img className="active" src="/img/delete.png" onClick={handleDelete} />
			</td>
		</tr>
	);
}
