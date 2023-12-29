import { OrderItem } from "../controllers/OrderItemsController";

type OrderItemProps = {
    orderItem: OrderItem;
}

export default function OrderItemComponent(props: OrderItemProps): JSX.Element
{
    const { orderItem } = props;

    return (
        <tr id="det_8" className="font-size-120">
            <td>{orderItem.recipe.name}</td>
            <td>
                <div contentEditable="true">{orderItem.servings}</div>
            </td>
            <td>{orderItem.recipe.ingCost}</td>
            <td>{orderItem.recipe.ingCost * orderItem.servings}</td>
            <td>
                <img className="active" src="/img/delete.png" />
            </td>
        </tr>
    );
}