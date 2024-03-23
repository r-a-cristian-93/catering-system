import { useEffect } from "react";
import PickAddressTable from "./PickAddressTable";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";
import { usePickAddressContext } from "../../../contexts/PickAddressContext";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

type PickAddressModalContentProps = {
	orderId: number;
	clientId: number;
};

export default function PickAddressModalContent(props: PickAddressModalContentProps): JSX.Element
{
	const { orderId, clientId } = props;
	const { markerPosition, } = usePickAddressContext();
	const { order } = useOrderDetailsContext();
	const position: LatLngTuple = [
		markerPosition?.[ 0 ] || order?.deliveryAddress?.latitude || 0,
		markerPosition?.[ 1 ] || order?.deliveryAddress?.longitude || 0
	];

	return (
		<div className={"address-selector"}>
			<PickAddressTable orderId={orderId} clientId={clientId} />

			<MapContainer center={position} zoom={13} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<img className="sticky-marker" src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" />
				<CenterMap position={position} />
				<SearchField />
			</MapContainer>
		</div>
	);
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

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
function SearchField(): JSX.Element
{
	const { setMarkerPosition } = usePickAddressContext();
	const map = useMap();
	const provider = new OpenStreetMapProvider();
	const searchControl = new GeoSearchControl({
		provider: provider,
		searchLabel: "Caută o adresă.",
		notFoundMessage: 'Adresa nu a fost găsită.',
		style: "bar",
		marker: { draggable: true },
		showMarker: false
	});

	function handleMapSearchResult(event: any): void
	{
		const searchResultPosition: LatLngTuple = [ event.location.y, event.location.x ];
		setMarkerPosition(searchResultPosition);

	}

	function handleMoveEnd(): void
	{
		const mapCenterPosition: LatLngTuple = [ map.getCenter().lat, map.getCenter().lng ];
		setMarkerPosition(mapCenterPosition);
	}

	useEffect(() =>
	{
		map.addControl(searchControl);
		map.on('geosearch/showlocation', handleMapSearchResult);
		map.on('move', handleMoveEnd)

		return () =>
		{
			map.removeControl(searchControl);
			map.off('geosearch/showlocation', handleMapSearchResult);
			map.off('move', handleMoveEnd)
		}
	}, [ map, searchControl ]);

	return <></>;
}

