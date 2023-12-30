import { OrderItem, getOrderItems } from "../controllers/OrderItemsController";
import OrderItemComponent from "./OrderItemComponent";
import * as Formatter from "../utils/Formatting.tsx";
import { useEffect, useState } from "react";

type OrderItemsProps = {
    orderId: number;
}

function getTotalCost(orderItems: OrderItem[]): number
{
    return orderItems.reduce((total, orderItem) =>
        total + orderItem.servings * orderItem.recipe.ingCost, 0
    );
}

export default function OrderItems(props: OrderItemsProps): JSX.Element
{
    const orderId: number = props.orderId;
    const [ orderItems, setItems ] = useState<OrderItem[]>([]);

    useEffect(() =>
    {
        void getOrderItems(orderId).then((items) =>
        {
            setItems(items);
        })
    }, []);

    function handleChildChange(orderItem: OrderItem): void
    {
        const newItems: OrderItem[] = [...orderItems];
        const index: number = orderItems.findIndex((item) => item.id === orderItem.id);

        if (index !== -1)
        {
            newItems[index] = orderItem;
            setItems(newItems);
        }
    }

    function handleChildDelete(orderItem: OrderItem): void
    {
        setItems((prevItems) =>
        {
            return prevItems.filter((item) => item.id !== orderItem.id);
        });
    }

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
                        <OrderItemComponent key={orderItem.id} orderItem={orderItem} parentChangeCallback={handleChildChange} parentDeleteCallback={handleChildDelete}/>
                    )
                }
                <tr id="det_total" className="font-size-140">
                    <th></th>
                    <th></th>
                    <th>Total:</th>
                    <th>{Formatter.formatCurrency(getTotalCost(orderItems))}</th>
                </tr>
            </tbody>
        </table>
    );
}