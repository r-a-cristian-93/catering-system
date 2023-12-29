import { OrderItem } from "../controllers/OrderItemsController";
import * as Formatter from "../utils/Formatting";

type OrderItemProps = {
    orderItem: OrderItem;
}

export default function OrderItemComponent(props: OrderItemProps): JSX.Element
{
    const { name, ingCost: costPerServing } = props.orderItem.recipe;
    const { servings } = props.orderItem;
    const costTotal = costPerServing * servings;

    return (
        <tr id="det_8" className="font-size-120">
            <td>{name}</td>
            <td>
                <div contentEditable="true">{servings}</div>
            </td>
            <td>{Formatter.formatCurrency(costPerServing)}</td>
            <td>{Formatter.formatCurrency(costTotal)}</td>
            <td>
                <img className="active" src="/img/delete.png" />
            </td>
        </tr>
    );
}