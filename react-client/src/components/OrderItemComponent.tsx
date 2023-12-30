import { OrderItem } from "../controllers/OrderItemsController";
import * as Formatter from "../utils/Formatting";
import { ChangeEvent, FocusEvent, useState } from "react";

type OrderItemProps = {
    orderItem: OrderItem;
}

export default function OrderItemComponent(props: OrderItemProps): JSX.Element
{
    const { name, ingCost: costPerServing } = props.orderItem.recipe;
    const [ servings, setServings] = useState<number>(props.orderItem.servings);
    const costTotal = costPerServing * servings;

    function handleOnChange(event: ChangeEvent<HTMLInputElement>): void
    {
        setServings(Number(event.target.value));
    }

    function handleOnBlur(event: FocusEvent<HTMLInputElement>): void
    {
        console.log(event);
        // send put request
    }

    return (
        <tr id="det_8" className="font-size-120">
            <td>{name}</td>
            <td>
                <input value={servings} onChange={handleOnChange} onBlur={handleOnBlur}/>
            </td>
            <td>{Formatter.formatCurrency(costPerServing)}</td>
            <td>{Formatter.formatCurrency(costTotal)}</td>
            <td>
                <img className="active" src="/img/delete.png" />
            </td>
        </tr>
    );
}