import { OrderItem } from "../controllers/OrderItemsController";
import OrderItemComponent from "./OrderItemComponent";

type OrderItemsProps = {
    orderItems: OrderItem[];
}

export default function OrderItems(props: OrderItemsProps): JSX.Element
{
    const { orderItems } = props;

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
                    orderItems.map((orderItem) =>
                    {
                        return <OrderItemComponent orderItem={orderItem}/>
                    })
                }
                <tr id="det_total" className="font-size-140">
                    <th></th>
                    <th></th>
                    <th>Total:</th>
                    <th>193.56 Lei</th>
                </tr>
            </tbody>
        </table>
    );
}