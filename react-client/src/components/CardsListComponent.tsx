import OrderDetails from "../models/OrderDetails";
import CardComponent, { CardData } from "./CardComponent";
import * as Formatter from "../utils/Formatting";

type CardListComponentProps = {
	orderDetails: OrderDetails;
};

function CardsListComponent(props: CardListComponentProps): JSX.Element
{
	const { orderDetails } = props;

	// Store data first in order to easily five keys to each element of the list
	const cardsStructure: CardData[] = [
		{
			title: "Stare",
			iconClass: "expediata",
			contentList: [
				{ class: "card-text-big first-big", text: orderDetails.status.name },
				{ class: "card-text-medium", text: "24.01.2021 / 13:27" },
			],
		},
		{
			title: "Termen livrare",
			iconClass: "img-hourglass",
			contentList: [
				{ class: "card-text-medium", text: Formatter.formatDate(orderDetails.dueDate) },
				{ class: "card-text-big", text: Formatter.formatTime(orderDetails.dueDate) },
			],
		},
		{
			title: "Client",
			iconClass: "profil",
			contentList: [
				{ class: "card-text-big first-big", text: orderDetails.client.name },
				{ class: "card-text-medium", text: orderDetails.client.phone },
			],
		},
		{
			title: "Adresa livrare",
			iconClass: "img-pinlocation",
			contentList: [{ class: "card-text-medium", text: orderDetails.deliveryAddress.value }],
		},
	];

	return <div id="cards">
		{
			cardsStructure.map((cardData, index) =>
			{
				return <CardComponent key={index} cardData={cardData} />
			})
		}
	</div>;
}

export default CardsListComponent;
