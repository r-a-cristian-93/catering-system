import { getOrder } from "../controllers/OrderController";
import { Order } from "../models/Order";
import { useParams } from "react-router-dom";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { createContext, useContext, useState } from "react";
import { QueryKeysOrder } from "../QueryKeys/QueryKeysOrder";

const OrderDetailsContext = createContext<OrderDetailsContextValue | undefined>(undefined);

export type OrderDetailsContextValue = {
    order: Order | null,
    refetchOrder: () => void
}

export function useOrderDetailsContext()
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
    const queryClient: QueryClient = useQueryClient();
    const value = { order: order, refetchOrder: refetchOrder };

    function refetchOrder(): void
    {
        void queryClient.invalidateQueries(QueryKeysOrder.orderById(orderId));
    }

    useQuery<Order>({
        queryKey: QueryKeysOrder.orderById(orderId),
        queryFn: () => getOrder(orderId),
        onSuccess: setOrder
    });

    return <OrderDetailsContext.Provider value={value}>
        {props.children}
    </OrderDetailsContext.Provider>;
}
