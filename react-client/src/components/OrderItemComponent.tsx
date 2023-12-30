import { useMutation } from "react-query";
import { OrderItem, updateOrderItem } from "../controllers/OrderItemsController";
import * as Formatter from "../utils/Formatting";
import { ChangeEvent, useState } from "react";

type OrderItemProps = {
    orderItem: OrderItem;
    parentUpdateCallback: (orderItem: OrderItem) => void;
}

export default function OrderItemComponent(props: OrderItemProps): JSX.Element
{
    const [ orderItem, setItem ] = useState<OrderItem>(props.orderItem);
    const parentUpdateCallback = props.parentUpdateCallback;

    const costTotal = orderItem.recipe.ingCost * orderItem.servings;

    const postItem = useMutation({
        mutationFn: updateOrderItem,
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>): void
    {
        const { name, value } = event.target;

        if (name === "servings")
        {
            setItem((prevItem) =>
            {
                const newItem: OrderItem = {
                    ...prevItem,
                    [name]: Number(value),
                }

                parentUpdateCallback(newItem);

                return newItem;
            });
        }
    }

    function handleOnBlur(): void
    {
        postItem.mutate(orderItem);
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
                <img className="active" src="/img/delete.png" />
            </td>
        </tr>
    );
}