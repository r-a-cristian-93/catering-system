import { useState } from "react";
import { ClientAddress } from "../../../models/Order";
import Modal from "../../generic/Modal/Modal";
import Card from "../../generic/Card/Card";
import CardIcon from "../../generic/Card/CardIcon";
import CardDetails from "../../generic/Card/CardDetails";
import { useMap, useMapEvents } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import PickAddressModalContent from "../modals/PickAddressModalContent";
import { PickAddressContextProvider, usePickAddressContext } from "../../../contexts/PickAddressContext";

type CardAddressProps = {
	orderId: number;
	clientId: number | null;
	address: ClientAddress | null;
}

export default function CardAddressComponent(props: CardAddressProps): JSX.Element
{
	const { orderId, clientId, address } = props;
	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function handleToggleModal(): void
	{
		setModalActive(prev => !prev);
	}

	return (
		<>
			<Card className="card hover-pointer" onClick={handleToggleModal}>
				<CardIcon>
					<div className="card-bg img-pinlocation"></div>
				</CardIcon>
				<CardDetails>
					<div className="card-title">Adresa livrare</div>
					<div className="card-text-medium">
						{address?.value}
					</div>
				</CardDetails>
			</Card>
			{
				isModalActive && clientId &&
				<Modal title="Alege adresa" toggleCallback={handleToggleModal} style={{ width: "1200px" }}>
					<PickAddressContextProvider>
						<PickAddressModalContent orderId={orderId} clientId={clientId} />
					</PickAddressContextProvider>
				</Modal >
			}
		</>
	);
}

export function DetectMapClick(): JSX.Element
{
	const { isMarkerCursorActive, toggleMarkerCursor, setNewPosition } = usePickAddressContext();

	useMapEvents({
		click: event =>
		{
			if (isMarkerCursorActive)
			{
				toggleMarkerCursor();
				setNewPosition(event.latlng)
			}
		}
	})

	return <></>;
}

type CenterMapProps = {
	position: LatLngTuple;
}

export function CenterMap(props: CenterMapProps): JSX.Element
{
	const map = useMap();
	map.setView(props.position)

	return <></>
}