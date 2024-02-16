import React from "react"
import { pageScrollBlock, pageScrollUnblock } from "../utils/PageScroll"

export default function InputScrollBlocking(props: React.HTMLProps<HTMLInputElement>): JSX.Element
{
	function handleOnBlur(event: React.FocusEvent<HTMLInputElement>): void
	{
		props.onBlur && props.onBlur(event);
		pageScrollUnblock();
	}

	return (
		<input  dir="rtl"
			{...props}

			onFocus={pageScrollBlock}
			onBlur={handleOnBlur}
		/>
	)
}