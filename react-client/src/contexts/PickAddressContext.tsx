import { createContext, useContext, useState } from "react";
import { LatLngTuple } from "leaflet";

type PickAddressContextValue = {
	markerPosition: LatLngTuple | null;
	setMarkerPosition: (position: LatLngTuple) => void;
	searchedAddress: MapSearchAddressResponse | null;
	setSearchedAddress: (address: MapSearchAddressResponse | null) => void,

};

export type MapSearchAddressResponse = {
	label: string;
	coordinates: LatLngTuple;
}

const PickAddressContext = createContext<PickAddressContextValue | undefined>(undefined);

export function PickAddressContextProvider(props: React.HTMLProps<HTMLElement>): JSX.Element
{
	const [ markerPosition, setMarkerPosition ] = useState<LatLngTuple | null>(null);
	const [ searchedAddress, setSearchedAddress ] = useState<MapSearchAddressResponse | null>(null);

	const value: PickAddressContextValue = {
		markerPosition: markerPosition,
		setMarkerPosition: setMarkerPosition,
		searchedAddress: searchedAddress,
		setSearchedAddress: setSearchedAddress,
	};


	return <PickAddressContext.Provider value={value}>
		{props.children}
	</PickAddressContext.Provider>;
}

export function usePickAddressContext(): PickAddressContextValue
{
	const context = useContext(PickAddressContext);

	if (context === undefined)
		throw new Error("You can't use PickAddressContext here");

	return context;
}
