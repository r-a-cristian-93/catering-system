import { useState } from "react";
import { Client } from "../models/Order/Order";

export default function PickClientCreateNew(): JSX.Element
{
	const [ client ] = useState<Client | null>(null);

	return (
		<div className="pick-client-create-box">
			<div className="card-bg profil"></div>
			<form className="pick-client-create-details">
					<label className="item-1">Nume: </label>
					<input className="item-2" name="name" type="text" value={client?.name} />
					<label className="item-3">Telefon: </label>
					<input className="item-4" name="phone" type="number" value={Number(client?.phone)} />
					<button className="item-5 button" type="submit">Adauga</button>
			</form>
		</div>
	)
}