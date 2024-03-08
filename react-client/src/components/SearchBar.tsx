import { ChangeEvent, useState } from "react";
import useFocus from "../hooks/UseFocus";

type SearchBarParams = {
	onSearch: (searchValue: string | null) => void;
	onReset: () => void;
}

export default function SearchBar(params: SearchBarParams): JSX.Element
{
	const [ searchValue, setSearchValue ] = useState<string | null>("");
	const inputField = useFocus<HTMLInputElement>();

	function handleChange(event: ChangeEvent<HTMLInputElement>): void
	{
		setSearchValue(event.target.value);

		if (!event.target.value)
		{
			params.onReset();
		}
	}

	function handleSearch(): void
	{
		params.onSearch(searchValue);
	}

	return (
		<div className="search-bar">
			<input
				type="search"
				name="search"
				placeholder="Cauta..."
				value={searchValue || ""}
				onChange={handleChange}
				ref={inputField}
			/>
			<button className="search-magnifier" onClick={handleSearch}>
				<img width="20px" height="20px" src="/img/search.svg" />
			</button>
		</div>
	)
}