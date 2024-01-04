import { useEffect } from "react";
import { pageScrollBlock, pageScrollUnblock } from "../utils/PageScroll";



export default function useScrollBlocking(): void
{
    useEffect(() =>
	{
		pageScrollBlock();

		return () =>
		{
			pageScrollUnblock();
		}
	});
}