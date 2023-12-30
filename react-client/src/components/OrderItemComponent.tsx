import { OrderItem, deleteOrderItem, updateOrderItem } from "../controllers/OrderItemsController";
import * as Formatter from "../utils/Formatting";
import { ChangeEvent } from "react";

type OrderItemProps = {
    orderItem: OrderItem;
    parentChangeCallback: (orderItem: OrderItem) => void;
    parentDeleteCallback: (orderItem: OrderItem) => void;
}

export default function OrderItemComponent(props: OrderItemProps): JSX.Element
{
    const orderItem: OrderItem = props.orderItem;
    const {parentChangeCallback, parentDeleteCallback} = props;

    const costTotal = orderItem.recipe.ingCost * orderItem.servings;

    function handleChange(event: ChangeEvent<HTMLInputElement>): void
    {
        const { name, value } = event.target;

        if (name === "servings")
        {
            const newItem: OrderItem = {
                ...orderItem,
                [name]: Number(value),
            }

            parentChangeCallback(newItem);
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
            if (isItemDeleted)
                parentDeleteCallback(orderItem);
        })
    }

    return (
        <tr id="det_8" className="font-size-120">
            <td>{orderItem.recipe.name}</td>
            <td>
                <input name="servings" value={orderItem.servings} onChange={handleChange} onBlur={handleOnBlur}/>
            </td>
            <td>{Formatter.formatCurrency(orderItem.recipe.ingCost)}</td>
            <td>{Formatter.formatCurrency(costTotal)}</td>
            <td>
                <img className="active" src="/img/delete.png" onClick={handleDelete}/>
            </td>
        </tr>
    );
}