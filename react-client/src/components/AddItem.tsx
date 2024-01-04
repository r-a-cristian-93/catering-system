import { ChangeEvent, useState } from "react";
import { OrderItem, addOrderItem } from "../controllers/OrderItemsController";
import { Order } from "../models/Order/Order";
import { Recipe } from "../models/Recipe/Recipe";
import * as Formatter from "../utils/Formatting";

type AddItemProps = {
	orderId: number;
	recipe: Recipe;
	addSuccessfulCallback: (orderItem: OrderItem) => void
};

export default function AddItem(props: AddItemProps): JSX.Element
{
	const [ orderItem, setOrderItem ] = useState<OrderItem>(
		{
			order: { id: props.orderId } as Order,
			recipe: props.recipe,
			servings: 0,
		} as OrderItem
	)

	function handleAddItem(): void
	{
		if (orderItem.servings)
		{
			void addOrderItem(orderItem).then((item) =>
			{
				props.addSuccessfulCallback(item);
			});
		}
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>): void
	{
		const { name, value } = event.target;

		if (name === "servings")
			(Number(value) >= 0) && setOrderItem((prev) => ({
				...prev,
				[ name ]: Number(value)
			}));
	}

	return (
		<tr id="2">
			<td>{orderItem.recipe.id}</td>
			<td>{orderItem.recipe.name}</td>
			<td>{orderItem.recipe.quantity + " " + orderItem.recipe.unit.name}</td>
			<td>{Formatter.formatCurrency(orderItem.recipe.ingCost)}</td>
			<td>
				<input
					type="number" size={4}
					name="servings"
					value={orderItem.servings || ""}
					onChange={handleChange}
					placeholder="0"
					min="0"
				/>
				<span className="img-edit"></span>
			</td>
			<td width={130}>
				{
					orderItem.servings &&
					Formatter.formatCurrency(orderItem.recipe.ingCost * orderItem.servings) || ""
				}
			</td>
			<td><img
				src="/img/add.png"
				onClick={handleAddItem}
				className={orderItem.servings ? "" : "inactive"}
			/></td>
		</tr>
	);
}
