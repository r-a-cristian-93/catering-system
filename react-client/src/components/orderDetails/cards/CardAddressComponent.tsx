import { createContext, useContext, useState } from "react";
import { ClientAddress } from "../../../models/Order";
import PickAddressTable from "../modals/PickAddressTable";
import Modal from "../../generic/Modal/Modal";
import Card from "../../generic/Card/Card";
import CardIcon from "../../generic/Card/CardIcon";
import CardDetails from "../../generic/Card/CardDetails";
import { MapContainer, Marker, TileLayer, useMapEvent, useMapEvents } from "react-leaflet";
import { LatLng, LatLngTuple } from "leaflet";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QueryKeysAddress } from "../../../QueryKeys/QueryKeysAddress";
import { getAddresses } from "../../../controllers/AddressControllere";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";

type CardAddressProps = {
	orderId: number;
	clientId: number | null;
	address: ClientAddress | null;
}

type PickAddressContextValue = {
	isMarkerCursorActive: boolean;
	toggleMarkerCursor: () => void;
	newPosition: LatLng | null;
	setNewPosition: (position: LatLng) => void;
}

const PickAddressContext = createContext<PickAddressContextValue | undefined>(undefined);

function PickAddressContextProvider(props: React.HTMLProps<HTMLElement>): JSX.Element
{
	const [ isMarkerCursorActive, setMarkerCursorActive ] = useState<boolean>(false);
	const [ newPosition, setNewPosition ] = useState<LatLng | null>(null);

	const value = {
		isMarkerCursorActive: isMarkerCursorActive,
		toggleMarkerCursor: toggleMarkerCursor,
		newPosition: newPosition,
		setNewPosition: setNewPosition
	}

	function toggleMarkerCursor(): void
	{
		setMarkerCursorActive((prev) => !prev)
	}

	return <PickAddressContext.Provider value={value}>
		{props.children}
	</PickAddressContext.Provider>
}

function usePickAddressContext()
{
	const context = useContext(PickAddressContext);

	if (context === undefined)
		throw new Error("You can't use " + PickAddressContext.displayName + "here");

	return context;
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

type PickAddressModalContent = {
	orderId: number;
	clientId: number;
}

export function PickAddressModalContent(props: PickAddressModalContent): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();
	const { orderId, clientId } = props;
	const { newPosition, isMarkerCursorActive, toggleMarkerCursor } = usePickAddressContext();
	const { order } = useOrderDetailsContext();
	const position: LatLngTuple = [
		newPosition?.lat || order?.deliveryAddress?.latitude || 0,
		newPosition?.lng || order?.deliveryAddress?.longitude || 0 ];

	const [ clientAddresses, setClientAddresses ] = useState<ClientAddress[] | null>(
		queryClient.getQueryData<ClientAddress[]>(QueryKeysAddress.byClientId(clientId)) || null
	);

	useQuery<ClientAddress[]>({
		queryKey: QueryKeysAddress.byClientId(clientId),
		queryFn: () => getAddresses(clientId),
		onSuccess: (responseData) =>
		{
			setClientAddresses(responseData);
		},
		staleTime: Infinity,
	});

	return (
		<div className={"address-selector " + (isMarkerCursorActive ? "cursor-map-marker" : "")}>
			<PickAddressTable orderId={orderId} clientId={clientId} />

			<br />
			<div>
				<button className="button" type="button" onClick={() => { toggleMarkerCursor() }}>
					<img
						src="/img/register-client.svg"
						style={{ filter: "invert(1)", marginRight: "12px" }}
					/>
					<span>Inregistreaza o noua adresa</span>
				</button>
			</div>
			<br />

			<MapContainer center={position} zoom={13} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{
					clientAddresses?.map((address, index) => <Marker key={index} position={[ address.latitude, address.longitude ]} />)
				}
				{
					newPosition && <Marker key={newPosition.lat} position={[ newPosition?.lat, newPosition?.lng ]} />
				}
				<DetectMapClick />
			</MapContainer>
		</div>
	)
}

function DetectMapClick(): JSX.Element
{
	const { toggleMarkerCursor, setNewPosition } = usePickAddressContext();

	useMapEvents({
		click: event =>
		{
			toggleMarkerCursor();
			setNewPosition(event.latlng)
		}
	})

	return <></>;
}