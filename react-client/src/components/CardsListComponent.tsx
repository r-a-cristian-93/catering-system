import { Order } from "../models/Order/Order";
import CardComponent, { CardData } from "./CardComponent";
import * as Formatter from "../utils/Formatting";
import { StatusEnum } from "../models/Order/Order";
import CardDueDateComponent from "./CardDueDateComponent";
import CardClientComponent from "./CardClientComponent";

type CardListComponentProps = {
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

function CardsListComponent(props: CardListComponentProps): JSX.Element
{
	const {
		id: orderId,
		status,
		dueDate,
		client,
		deliveryAddress
	} = props.order;

	const statusDate: string | null = getCurrentStatusDate(props.order);

	// Store data first in order to easily five keys to each element of the list
	const cardsStructure: CardData[] = [
		{
			title: "Stare",
			iconClass: status.name,
			contentList: [
				{ class: "card-text-big first-big", text: status.name },
				{ class: "card-text-medium", text: Formatter.formatDate(statusDate) },
			],
		},
		{
			title: "Termen livrare",
			iconClass: "img-hourglass",
			contentList: [
				{ class: "card-text-medium", text: Formatter.formatDate(dueDate) },
				{ class: "card-text-big", text: Formatter.formatTime(dueDate) },
			],
		},
		{
			title: "Client",
			iconClass: "profil",
			contentList: [
				{ class: "card-text-big first-big", text: client?.name || "" },
				{ class: "card-text-medium", text: client?.phone || "" },
			],
		},
		{
			title: "Adresa livrare",
			iconClass: "img-pinlocation",
			contentList: [ { class: "card-text-medium", text: deliveryAddress?.value || "" } ],
		},
	];

	return <div id="cards">
		{
			cardsStructure.map((cardData, index) =>
			{
				return <CardComponent key={index} cardData={cardData} />
			})
		}
		<CardDueDateComponent date={dueDate} orderId={orderId} />
		<CardClientComponent client={client} orderId={orderId}/>
	</div>;
}

export default CardsListComponent;
