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
    function handleAddItem(): void
    {
        const orderItem: OrderItem = {
            order: { id: props.orderId } as Order,
            recipe: props.recipe,
            servings: 0,
        } as OrderItem;

        void addOrderItem(orderItem).then((item) =>
        {
            props.addSuccessfulCallback(item);
        });
    }

    return (
        <tr id="2" onDoubleClick={handleAddItem}>
            <td>{props.recipe.id}</td>
            <td>{props.recipe.name}</td>
            <td>{props.recipe.quantity + " " + props.recipe.unit.name}</td>
            <td>{Formatter.formatCurrency(props.recipe.ingCost)}</td>
        </tr>
    );
}
