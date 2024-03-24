import { getOrder } from "../controllers/OrderController";
import { Order, OrderItem } from "../models/Order";
import { useParams } from "react-router-dom";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { createContext, useContext, useState } from "react";
import { QueryKeysOrder } from "../QueryKeys/QueryKeysOrder";
import { getOrderItems } from "../controllers/OrderItemsController";

const OrderDetailsContext = createContext<OrderDetailsContextValue | undefined>(undefined);

export type OrderDetailsContextValue = {
    order: Order | null,
    orderItems: OrderItem[] | null,
    refetchOrder: () => void,
    refetchItems: () => void,
    setOrderItems: (items: OrderItem[]) => void,
}

export function useOrderDetailsContext(): OrderDetailsContextValue
{
    const context = useContext(OrderDetailsContext);

    if (context === undefined)
        throw new Error("You can't use " + OrderDetailsContext.displayName + "here");

    return context;
}

export function OrderDetailsProvider(props: React.HTMLProps<HTMLElement>): JSX.Element
{
    const orderId: number = Number(useParams().orderId);
    const [ order, setOrder ] = useState<Order | null>(null);
    const [ orderItems, setOrderItems ] = useState<OrderItem[] | null>(null);
    const queryClient: QueryClient = useQueryClient();

    const value = {
        order: order,
        orderItems: orderItems,
        refetchOrder: refetchOrder,
        refetchItems: refetchItems,
        setOrderItems: setOrderItems,
    };

    function refetchOrder(): void
    {
        void queryClient.invalidateQueries(QueryKeysOrder.orderById(orderId));
    }

    function refetchItems(): void
    {
        void queryClient.invalidateQueries(QueryKeysOrder.itemsByOrderId(orderId));
    }

    useQuery<Order>({
        queryKey: QueryKeysOrder.orderById(orderId),
        queryFn: () => getOrder(orderId),
        onSuccess: setOrder,
    });

    useQuery<OrderItem[]>({
        queryKey: QueryKeysOrder.itemsByOrderId(orderId),
        queryFn: () => getOrderItems(orderId),
        onSuccess: setOrderItems,
    });

    return <OrderDetailsContext.Provider value={value}>
        {props.children}
    </OrderDetailsContext.Provider>;
}
