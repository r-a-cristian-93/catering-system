import CardDueDateComponent from "./CardDueDateComponent";
import CardClientComponent from "./CardClientComponent";
import CardStatusComponent from "./CardStatusComponent";
import CardAddressComponent from "./CardAddressComponent";

export default function CardListOrder(): JSX.Element
{
	return <div className="cards">
		<CardStatusComponent />
		<CardDueDateComponent />
		<CardClientComponent />
		<CardAddressComponent />
	</div>;
}