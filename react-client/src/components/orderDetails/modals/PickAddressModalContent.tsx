import { useEffect, useState } from "react";
import { ClientAddress } from "../../../models/Order";
import PickAddressTable from "./PickAddressTable";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QueryKeysAddress } from "../../../QueryKeys/QueryKeysAddress";
import { getAddresses } from "../../../controllers/AddressControllere";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";
import { usePickAddressContext } from "../../../contexts/PickAddressContext";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

type PickAddressModalContentProps = {
	orderId: number;
	clientId: number;
};

export default function PickAddressModalContent(props: PickAddressModalContentProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();
	const { orderId, clientId } = props;
	const { newPosition, isMarkerCursorActive, toggleMarkerCursor } = usePickAddressContext();
	const { order } = useOrderDetailsContext();
	const position: LatLngTuple = [
		newPosition?.lat || order?.deliveryAddress?.latitude || 0,
		newPosition?.lng || order?.deliveryAddress?.longitude || 0
	];

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
			{/* <div>
				<button className="button" type="button" onClick={() =>
				{
					toggleMarkerCursor();
				}}>
					<img
						src="/img/register-client.svg"
						style={{ filter: "invert(1)", marginRight: "12px" }} />
					<span>Inregistreaza o noua adresa</span>
				</button>
			</div>
			<br /> */}

			<MapContainer center={position} zoom={13} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				{clientAddresses?.map((address, index) => <Marker key={index} position={[ address.latitude, address.longitude ]} />)}
				{newPosition && <Marker key={newPosition.lat} position={[ newPosition.lat, newPosition.lng ]} />}
				<CenterMap position={position} />
				<DetectMapClick />
				<SearchField />
			</MapContainer>
		</div>
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

function SearchField(): JSX.Element
{
	const map = useMap();
	const provider = new OpenStreetMapProvider();
	const searchControl = new GeoSearchControl({
		provider: provider,
		searchLabel: "Caută o adresă.",
		notFoundMessage: 'Adresa nu a fost găsită.',
		style: "bar",
		marker: {draggable:true},
	});

	useEffect(() =>
	{
		map.addControl(searchControl);
		return () => map.removeControl(searchControl);
	}, [ map, searchControl ]);

	return <></>;
};