import CardDueDateComponent from "./CardDueDateComponent";
import CardClientComponent from "./CardClientComponent";
import CardStatusComponent from "./CardStatusComponent";
import CardAddressComponent from "./CardAddressComponent";
import { PickAddressContextProvider } from "../../../contexts/PickAddressContext";



export default function CardListOrder(): JSX.Element
{
	return <div className="cards">
		<CardStatusComponent />
		<CardDueDateComponent />
		<CardClientComponent />
		<PickAddressContextProvider>
			<CardAddressComponent />
		</PickAddressContextProvider>
	</div>;
}