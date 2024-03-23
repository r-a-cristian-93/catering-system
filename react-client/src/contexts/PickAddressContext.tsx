import { createContext, useContext, useState } from "react";
import { LatLngTuple } from "leaflet";

type PickAddressContextValue = {
	isMarkerCursorActive: boolean;
	toggleMarkerCursor: () => void;
	markerPosition: LatLngTuple | null;
	setMarkerPosition: (position: LatLngTuple) => void;
};

const PickAddressContext = createContext<PickAddressContextValue | undefined>(undefined);

export function PickAddressContextProvider(props: React.HTMLProps<HTMLElement>): JSX.Element
{
	const [ isMarkerCursorActive, setMarkerCursorActive ] = useState<boolean>(false);
	const [ markerPosition, setMarkerPosition ] = useState<LatLngTuple | null>(null);

	const value = {
		isMarkerCursorActive: isMarkerCursorActive,
		toggleMarkerCursor: toggleMarkerCursor,
		markerPosition: markerPosition,
		setMarkerPosition: setMarkerPosition
	};

	function toggleMarkerCursor(): void
	{
		setMarkerCursorActive((prev) => !prev);
	}

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
