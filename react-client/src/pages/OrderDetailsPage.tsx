import { updateOrder } from "../controllers/OrderController";
import { Order, StatusEnum } from "../models/Order";
import CardListOrder from "../components/orderDetails/cards/CardListOrder";
import OrderItems from "../components/orderDetails/OrderItems";
import OrderProgress from "../components/orderDetails/OrderProgress/OrderProgress";
import SimplePage from "../components/generic/SimplePage/SimplePage";
import { useOrderDetailsContext } from "../contexts/OrderDetailsContext";

export default function OrderDetailsPage(): JSX.Element
{
	const { order, refetchOrder } = useOrderDetailsContext();

	function handleSetStateSucessfull(): void
	{
		refetchOrder()
	}

	function handleCancelOrder(): void
	{
		if (order)
		{
			const canceledOrder: Order = order;
			canceledOrder.status.name = StatusEnum.ANULATA;

			void updateOrder(canceledOrder).then(() =>
			{
				refetchOrder()
			});
		}
	}

	return (
		<SimplePage title={"Comanda #" + order?.id} imagePath="/img/orders.png">
			{
				order && <CardListOrder />
			}

			{
				order && <OrderProgress order={order} setStateSuccessfullCallback={handleSetStateSucessfull} />
			}

			{
				(order) && <OrderItems key={Math.round(Math.random() * 100)} orderId={order.id} />
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
