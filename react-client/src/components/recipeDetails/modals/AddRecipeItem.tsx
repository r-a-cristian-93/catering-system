import { ChangeEvent, useState } from "react";
import { addRecipeItem } from "../../../controllers/RecipeItemsController";
import { RecipeItem } from "../../../models/Recipe";
import { Ingredient as Ingredient } from "../../../models/Ingredient";
import * as Formatter from "../../../utils/Formatting";

type AddIngredientItemProps = {
	recipeId: number;
	ingredient: Ingredient;
	addSuccessfulCallback: (recipeItem: RecipeItem) => void
};

export default function AddItem(props: AddIngredientItemProps): JSX.Element
{
	const [ recipeItem, setRecipeItem ] = useState<RecipeItem>(
		{
			recipeId: props.recipeId,
			ingredient: props.ingredient,
			quantity: 0,
		} as RecipeItem
	)

	function handleAddItem(): void
	{
		if (recipeItem.quantity)
		{
			void addRecipeItem(recipeItem).then((item) =>
			{
				props.addSuccessfulCallback(item);
			});
		}
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>): void
	{
		const { name, value } = event.target;

		if (name === "quantity")
			(Number(value) >= 0) && setRecipeItem((prev) => ({
				...prev,
				[ name ]: Number(value)
			}));
	}

	return (
		<tr id="2">
			<td>{recipeItem.ingredient.id}</td>
			<td>{recipeItem.ingredient.name}</td>
			<td>{Formatter.formatCurrency(recipeItem.ingredient.price) +  "/" + recipeItem.ingredient.unit.name }</td>
			<td>
				<input
					type="number" size={4}
					name="quantity"
					value={recipeItem.quantity || ""}
					onChange={handleChange}
					placeholder="0"
					min="0"
				/>
				<span className="img-edit"></span>
			</td>
			<td width={130}>
				{
					recipeItem.quantity &&
					Formatter.formatCurrency(recipeItem.ingredient.price * recipeItem.quantity) || ""
				}
			</td>
			<td><img
				src="/img/add.png"
				onClick={handleAddItem}
				className={recipeItem.quantity ? "" : "inactive"}
			/></td>
		</tr>
	);
}
