import { useEffect } from "react";
import PickAddressTable from "./PickAddressTable";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";
import { MapSearchAddressResponse, usePickAddressContext } from "../../../contexts/PickAddressContext";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { getAddress, getFakeAddress } from "../../../controllers/NominatimAddress";

type PickAddressModalContentProps = {
	orderId: number;
	clientId: number;
};

export default function PickAddressModalContent(props: PickAddressModalContentProps): JSX.Element
{
	const { orderId, clientId } = props;
	const { markerPosition, label } = usePickAddressContext();
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

				{
					label &&
					<div className="sticky-address-label">
						{label}
						<button className={"button"} style={{ marginLeft: "40px" }}>Foloseste aceasta adresa</button>
					</div>
				}

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
	const { label, setMarkerPosition, setLabel } = usePickAddressContext();
	const map = useMap();
	const provider = new OpenStreetMapProvider();
	const searchControl = new GeoSearchControl({
		provider: provider,
		searchLabel: "Caută o adresă.",
		notFoundMessage: 'Adresa nu a fost găsită.',
		style: "bar",
		marker: { draggable: true },
		showMarker: false,
		keepResults: true
	});

	function handleMapSearchResult(event: any): void
	{
		const searchResultPosition: LatLngTuple = [ event.location.y, event.location.x ];

		setMarkerPosition(searchResultPosition);
		setLabel(event.location.label);
	}

	function handleDragEnd(): void
	{
		const mapCenterPosition: LatLngTuple = [ map.getCenter().lat, map.getCenter().lng ];

		void getFakeAddress(mapCenterPosition).then((address) =>
		{
			setLabel(address.display_name);
			setMarkerPosition(mapCenterPosition);
		});
	}

	useEffect(() =>
	{
		map.addControl(searchControl);
		map.on('geosearch/showlocation', handleMapSearchResult);
		map.on('dragend', handleDragEnd)

		return () =>
		{
			map.removeControl(searchControl);
			map.off('geosearch/showlocation', handleMapSearchResult);
			map.off('dragend', handleDragEnd)
		}
	}, [ map, searchControl ]);

	return <></>;
}

