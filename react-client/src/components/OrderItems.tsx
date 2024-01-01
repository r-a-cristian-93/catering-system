import { OrderItem, getOrderItems } from "../controllers/OrderItemsController";
import OrderItemComponent from "./OrderItemComponent";
import * as Formatter from "../utils/Formatting.tsx";
import { useState } from "react";
import { useQuery } from "react-query";
import { queryClient } from "../main.tsx";
import AddItemModal from "./AddItemModal.tsx";

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
    const orderId = props.orderId;

    // fetch order items
    const { isSuccess: orderItemsQuerySucess } = useQuery<OrderItem[]>({
        queryKey: [ "orderItems", Number(orderId) ],
        queryFn: () => getOrderItems(Number(orderId)),
        onSuccess: (orderItems) =>
        {
            // set orderItems
            setOrderItems(orderItems);
        }
    });

    const [ orderItems, setOrderItems ] = useState<OrderItem[] | null>(
        queryClient.getQueryData([ "orderItems", Number(orderId) ]) as OrderItem[]
    );

    const [ isModalActive, setModalActive ] = useState<boolean>(false);

    orderItems?.sort((a, b) => a.id - b.id);

    function handleChildChange(orderItem: OrderItem): void
    {
        if (orderItems !== null)
        {
            const newItems: OrderItem[] = [ ...orderItems ];
            const index: number = orderItems.findIndex((item) => item.id === orderItem.id);

            if (index !== -1)
            {
                newItems[ index ] = orderItem;
                setOrderItems(newItems);
            }
        }
    }

    function handleChildDelete(orderItem: OrderItem): void
    {
        setOrderItems((prevItems) => prevItems &&
            prevItems.filter((item) => item.id !== orderItem.id)
        );
    }

    function handleToogleModal(): void
    {
        setModalActive(prev => !prev);
    }

    function handleAddItemSuccessful(orderItem: OrderItem): void
    {
        setOrderItems((prevItems) => prevItems &&
            [ ...prevItems, orderItem ]
        );

        console.log("atempt invalidate" + orderItem.id);
    }

    return (
        <>
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
                        orderItemsQuerySucess && orderItems && orderItems.map((orderItem) =>
                            <OrderItemComponent key={orderItem.id} orderItem={orderItem}
                                changeCallback={handleChildChange}
                                deleteCallback={handleChildDelete} />
                        )
                    }
                    <tr id="det_total" className="font-size-140">
                        <th></th>
                        <th></th>
                        <th>Total:</th>
                        <th>
                            {
                                orderItemsQuerySucess && orderItems && Formatter.formatCurrency(getTotalCost(orderItems))
                            }
                        </th>
                    </tr>
                </tbody>
            </table>
            <button className="add-button">
                <div className="add-button-text" onClick={handleToogleModal}>Adauga articol</div>
                <div className="add-button-dot">+</div>
            </button>

            {isModalActive && <AddItemModal
                key={Math.round(Math.random() * 100)}
                toogleModalCallback={handleToogleModal}
                orderId={Number(orderId)}
                addSuccessfulCallback={handleAddItemSuccessful} />}
        </>
    );
}