import { createContext, useContext, useState } from "react";
import { LatLng } from "leaflet";

type PickAddressContextValue = {
	isMarkerCursorActive: boolean;
	toggleMarkerCursor: () => void;
	newPosition: LatLng | null;
	setNewPosition: (position: LatLng) => void;
};

const PickAddressContext = createContext<PickAddressContextValue | undefined>(undefined);

export function PickAddressContextProvider(props: React.HTMLProps<HTMLElement>): JSX.Element
{
	const [ isMarkerCursorActive, setMarkerCursorActive ] = useState<boolean>(false);
	const [ newPosition, setNewPosition ] = useState<LatLng | null>(null);

	const value = {
		isMarkerCursorActive: isMarkerCursorActive,
		toggleMarkerCursor: toggleMarkerCursor,
		newPosition: newPosition,
		setNewPosition: setNewPosition
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
		throw new Error("You can't use " + PickAddressContext.displayName + "here");

	return context;
}
