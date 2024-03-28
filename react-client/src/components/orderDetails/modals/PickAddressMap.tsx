import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";
import { usePickAddressContext } from "../../../contexts/PickAddressContext";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { getAddress } from "../../../controllers/NominatimAddress";
import { ClientAddress } from "../../../models/Order";
import { updateAddress } from "../../../controllers/AddressControllere";

export default function PickAddressMap(): JSX.Element
{
	const { markerPosition, label } = usePickAddressContext();
	const { order, refetchOrder } = useOrderDetailsContext();
	const position: LatLngTuple = [
		markerPosition?.[ 0 ] || order?.client?.address?.latitude || 0,
		markerPosition?.[ 1 ] || order?.client?.address?.longitude || 0
	];

	function handleSetAddress(): void
	{
		if (markerPosition && label && order?.client?.address)
		{
			const address: ClientAddress = {
				...order.client.address,
				value: label,
				latitude: markerPosition[ 0 ],
				longitude: markerPosition[ 1 ]
			}

			void updateAddress(address).then(refetchOrder);
		}

		// if creating new client
		if (markerPosition && label && order?.client === null)
		{
			// do nothing
		}
	}

	return (
		<div className={"address-selector"}>
			<MapContainer center={position} zoom={13} scrollWheelZoom={"center"}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<img className="sticky-marker" src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" />

				<div className="sticky-address-label">
					{
						label &&
						<div>
							{label}
							{/* // hide this when creating new client? */}
							<button className={"button"} style={{ marginLeft: "40px" }} onClick={handleSetAddress}>Foloseste aceasta adresa</button>
						</div>
					}
					<div>
						<span>Adresa curentă: </span>
						{order?.client?.address?.value}
					</div>
				</div>

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
function SearchField(): JSX.Element
{
	const { setMarkerPosition, setLabel } = usePickAddressContext();
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

