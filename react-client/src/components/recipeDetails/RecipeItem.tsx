import { deleteOrderItem, updateOrderItem } from "../../controllers/OrderItemsController";
import { OrderItem } from "../../models/Order";
import * as Formatter from "../../utils/Formatting";
import { ChangeEvent } from "react";
import InputScrollBlocking from "../InputScrollBlocking";

type RecipeItemComponentProps = {
	orderItem: OrderItem;
	changeCallback: (orderItem: OrderItem) => void;
	deleteCallback: (orderItem: OrderItem) => void;
};

export default function RecipeItemComponent(props: RecipeItemComponentProps): JSX.Element
{
	const orderItem = props.orderItem;
	const { changeCallback, deleteCallback } = props;

	const costTotal = orderItem.recipe.ingCost * orderItem.servings;

	function handleChange(event: ChangeEvent<HTMLInputElement>): void
	{
		const { name, value } = event.target;

		if (name === "servings")
		{
			const newItem = {
				...orderItem,
				[ name ]: Number(value),
			};

			changeCallback(newItem);
		}
	}

	function handleOnBlur(): void
	{
		void updateOrderItem(orderItem);
	}

	function handleDelete(): void
	{
		void deleteOrderItem(orderItem).then((isItemDeleted) =>
		{
			if (isItemDeleted) deleteCallback(orderItem);
		});
	}

	return (
		<tr id="det_8" className="font-size-120">
			<td>{orderItem.recipe.name}</td>
			<td>
				<InputScrollBlocking
					name="servings"
					type="number"
					value={orderItem.servings}
					onChange={handleChange}
					onBlur={handleOnBlur}
					placeholder="0"
					min="0"
				/>
				<span className="img-edit"></span>
			</td>
			<td>{Formatter.formatCurrency(orderItem.recipe.ingCost)}</td>
			<td>{Formatter.formatCurrency(costTotal)}</td>
			<td>
				<img className="active" src="/img/delete.png" onClick={handleDelete} />
			</td>
		</tr>
	);
}
