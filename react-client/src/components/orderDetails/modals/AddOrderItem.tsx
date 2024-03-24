import { ChangeEvent, useState } from "react";
import { addOrderItem } from "../../../controllers/OrderItemsController";
import { OrderItem } from "../../../models/Order";
import { Recipe } from "../../../models/Recipe";
import * as Formatter from "../../../utils/Formatting";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";

type AddOrderItemProps = {
	recipe: Recipe;
};

export default function AddOrderItem(props: AddOrderItemProps): JSX.Element
{
	const { order, refetchItems } = useOrderDetailsContext();
	const [ orderItem, setOrderItem ] = useState<OrderItem>(
		{
			recipe: props.recipe,
			servings: 0,
		} as OrderItem
	)

	function handleAddItem(): void
	{
		if (orderItem.servings && order)
			void addOrderItem({ ...orderItem, orderId: order.id }).then(refetchItems);
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
		<tr>
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
