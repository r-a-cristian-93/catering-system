import { getOrder } from "../controllers/OrderController";
import { Order } from "../models/Order/Order";
import { useParams } from "react-router-dom";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import CardsListComponent from "../components/CardsListComponent";
import OrderItems from "../components/OrderItems";
import { useState } from "react";
import OrderProgress from "../components/OrderProgress";

export default function OrderDetailsPage(): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { orderId } = useParams();

	// fetch order
	const { isSuccess: orderQuerySuccess } = useQuery<Order>({
		queryKey: [ "order", Number(orderId) ],
		queryFn: () => getOrder(Number(orderId)),
		onSuccess: (order) =>
		{
			// set order
			setOrder(order);
		}
	});

	const [ order, setOrder ] = useState<Order | null>(
		queryClient.getQueryData([ "order", Number(orderId) ]) as Order | null
	);

	function handleSetStateSucessfull(order: Order): void
	{
        // optimistic update
		setOrder(order);

		void queryClient.invalidateQueries([ "order", Number(orderId) ]);
	}

	return (
		<div className="box">
			<div className="box-content" id="order-details">
				<div className="order-details-title">Detalii comanda #{order?.id}</div>

				{
					orderQuerySuccess && order && <CardsListComponent order={order} />
				}

				{
					orderQuerySuccess && order && <OrderProgress order={order} setStateSuccessfullCallback={handleSetStateSucessfull}/>
				}

				{
					<OrderItems key={Math.round(Math.random() * 100)} orderId={Number(orderId)} />
				}

				<div className="action-bar">
					<div className="action-button">
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
			</div>
		</div>
	);
}
