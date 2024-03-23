import { Order } from "../../../models/Order";
import { StatusEnum } from "../../../models/Order";
import CardDueDateComponent from "./CardDueDateComponent";
import CardClientComponent from "./CardClientComponent";
import CardStatusComponent from "./CardStatusComponent";
import CardAddressComponent from "./CardAddressComponent";

type CardListOrderProps = {
	order: Order;
};

function getCurrentStatusDate(order: Order): string | null
{
	const {
		status,
		placementDate,
		supplyDate,
		productionDate,
		preparingDate,
		shippingDate,
		cancelDate,
	} = order;

	switch (status.name)
	{
		case StatusEnum.PRELUATA:
			return placementDate;
		case StatusEnum.APROVIZIONATA:
			return supplyDate;
		case StatusEnum.PREPARATA:
			return productionDate;
		case StatusEnum.PREGATITA:
			return preparingDate;
		case StatusEnum.EXPEDIATA:
			return shippingDate;
		case StatusEnum.ANULATA:
			return cancelDate;
		default:
			return ""
	}
}

export default function CardListOrder(props: CardListOrderProps): JSX.Element
{
	const {
		id: orderId,
		status,
		dueDate,
		client,
		deliveryAddress,
	} = props.order;

	const statusDate: string | null = getCurrentStatusDate(props.order);

	return <div className="cards">
		<CardStatusComponent status={status} statusDate={statusDate} orderId={orderId} />
		<CardDueDateComponent date={dueDate} orderId={orderId} />
		<CardClientComponent client={client} orderId={orderId} />
		<CardAddressComponent address={deliveryAddress} orderId={orderId} clientId={client?.id || null} />
	</div>;
}