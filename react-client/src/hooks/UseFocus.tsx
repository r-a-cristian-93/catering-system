import { LegacyRef, useEffect, useRef } from "react";

export default function useFocus<T extends HTMLElement>(): LegacyRef<T>
{
	const inputField = useRef<T>(null);

	useEffect(() =>
	{
		inputField.current?.focus();
	}, []);

	return inputField;
}

