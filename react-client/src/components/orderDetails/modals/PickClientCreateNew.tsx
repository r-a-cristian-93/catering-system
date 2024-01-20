import { useState } from "react";
import { Client } from "../../../models/Order";

export default function PickClientCreateNew(): JSX.Element
{
	const [ client ] = useState<Client>({} as Client);

	function handleOnChange(): void
	{}

	return (
		<div className="pick-client-create-box">
			<div className="card-bg profil"></div>
			<form className="pick-client-create-details">
				<span className="item-1">Nume: </span>
				<input
					className="item-2"
					name="name"
					type="text"
					value={client.name}
					placeholder="name"
					onChange={handleOnChange}
					autoComplete="false"
				/>
				<span className="item-3">Telefon: </span>
				<input
					className="item-4"
					name="phone"
					type="text"
					value={client.phone || ""}
					placeholder="+40"
					onChange={handleOnChange}
					autoComplete="false"
				/>
				<button className="item-5 button" type="submit">Adauga</button>
			</form>
		</div>
	)
}