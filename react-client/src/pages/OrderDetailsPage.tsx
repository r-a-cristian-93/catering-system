import { getOrder, updateOrder } from "../controllers/OrderController";
import { Order, StatusEnum } from "../models/Order";
import { useParams } from "react-router-dom";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import CardListOrder from "../components/orderDetails/cards/CardListOrder";
import OrderItems from "../components/orderDetails/OrderItems";
import { useState } from "react";
import OrderProgress from "../components/orderDetails/OrderProgress";
import { QueryKeysOrder } from "../QueryKeys/QueryKeysOrder";
import SimplePage from "../components/generic/SimplePage/SimplePage";

export default function OrderDetailsPage(): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const orderId: number = Number(useParams().orderId);

	// fetch order
	const { isSuccess: orderQuerySuccess } = useQuery<Order>({
		queryKey: QueryKeysOrder.orderById(orderId),
		queryFn: () => getOrder(orderId),
		onSuccess: (order) =>
		{
			// set order
			setOrder(order);
		}
	});

	const [ order, setOrder ] = useState<Order | null>(
		queryClient.getQueryData(QueryKeysOrder.orderById(orderId)) as Order | null
	);

	function handleSetStateSucessfull(order: Order): void
	{
		// optimistic update
		setOrder(order);

		void queryClient.invalidateQueries(QueryKeysOrder.orderById(orderId));
	}

	function handleCancelOrder(): void
	{
		if (order)
		{
			const canceledOrder: Order = order;

			canceledOrder.status.name = StatusEnum.ANULATA;

			void updateOrder(canceledOrder).then((order) =>
			{
				setOrder(order)
			});
		}
	}

	return (
		<SimplePage title={"Comanda #" + order?.id} imagePath="/img/orders.png">
			{
				orderQuerySuccess && order && <CardListOrder order={order} />
			}

			{
				orderQuerySuccess && order && <OrderProgress order={order} setStateSuccessfullCallback={handleSetStateSucessfull} />
			}

			{
				<OrderItems key={Math.round(Math.random() * 100)} orderId={orderId} />
			}

			<div className="action-bar">
				<div className="action-button hover-pointer" onClick={handleCancelOrder}>
					<div className="action-icon anulata"></div>
					<div className="action-details">
						<div>Anuleaza</div>
						<div>comanda</div>
					</div>
				</div>
				<div className="action-button">
					<div className="action-icon img-cart"></div>
					<div className="action-details">
						<div>Lista</div>
						<div>aprovizionare</div>
					</div>
				</div>
				<div className="action-button">
					<div className="action-icon img-cart"></div>
					<div className="action-details">
						<div>Printare</div>
						<div>raport complet</div>
					</div>
				</div>
			</div>
		</SimplePage>
	);
}
