import React from "react"
import { pageScrollBlock, pageScrollUnblock } from "../utils/PageScroll"

// interface LabelEditableProps
// {
// 	children: ReactNode;
// }

export default function InputScrollBlocking(props: React.HTMLProps<HTMLInputElement>): JSX.Element
{
	return (
		<input
			{...props}
			onFocus={pageScrollBlock}
			onBlur={pageScrollUnblock} />
	)
}