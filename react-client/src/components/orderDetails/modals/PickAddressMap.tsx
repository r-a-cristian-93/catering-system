import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";
import { usePickAddressContext } from "../../../contexts/PickAddressContext";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { getAddress } from "../../../controllers/NominatimAddress";

export default function PickAddressMap(props: React.HTMLProps<HTMLDivElement>): JSX.Element
{
	const { markerPosition } = usePickAddressContext();
	const { order } = useOrderDetailsContext();
	const position: LatLngTuple = [
		markerPosition?.[ 0 ] || order?.client?.address?.latitude || 0,
		markerPosition?.[ 1 ] || order?.client?.address?.longitude || 0
	];

	return (
		<div className={"address-selector"}>
			<MapContainer center={position} zoom={13} scrollWheelZoom={"center"}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<img className="sticky-marker" src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" />

				{props.children}

				<CenterMap position={position} />
				<SearchField />
			</MapContainer>
		</div >
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
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */


function SearchField(): JSX.Element
{
	const { setMarkerPosition, setLabel } = usePickAddressContext();
	const map = useMap();
	const provider = new OpenStreetMapProvider();
	const searchControl = GeoSearchControl({
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

		void getAddress(mapCenterPosition).then((address) =>
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
