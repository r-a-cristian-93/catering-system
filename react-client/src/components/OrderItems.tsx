import { OrderItem } from "../controllers/OrderItemsController";
import OrderItemComponent from "./OrderItemComponent";
import * as Formatter from "../utils/Formatting.tsx";

type OrderItemsProps = {
    orderItems: OrderItem[];
}

function getTotalCost(orderItems: OrderItem[]): number
{
    return orderItems.reduce((total, orderItem) =>
        total + orderItem.servings * orderItem.recipe.ingCost, 0
    );
}

export default function OrderItems(props: OrderItemsProps): JSX.Element
{
    const { orderItems } = props;

    const totalCost: number = getTotalCost(orderItems);

    return (
        <table id="order-details-table" className="full table-list">
            <thead>
                <tr className="font-size-120">
                    <th>Articol</th>
                    <th>Portii</th>
                    <th>Cost unitar</th>
                    <th>Cost total</th>
                </tr>
            </thead>
            <tbody>
                {
                    orderItems.map((orderItem, index) =>
                    {
                        return <OrderItemComponent key={index} orderItem={orderItem}/>
                    })
                }
                <tr id="det_total" className="font-size-140">
                    <th></th>
                    <th></th>
                    <th>Total:</th>
                    <th>{Formatter.formatCurrency(totalCost)}</th>
                </tr>
            </tbody>
        </table>
    );
}