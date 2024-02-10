import { useState } from "react";
import { Client} from "../../../models/Order";
import { addClient } from "../../../controllers/ClientController";

export default function PickClientCreateNew(): JSX.Element
{
	const [ client, setClient ] = useState<Client>({} as Client);
	const [ clientAddress, setClientAddress ] = useState<string>("");

	function handleAddClient(): void
	{
		void addClient(client);
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
    {
        const { name, value } = event.target;

		if (name === "address")
			setClientAddress(value);

        setClient((prev) =>
        {
            return {
                ...prev,
                [ name ]: value,
            };
        });
    }

	return (
		<div className="pick-client-create-box">
			<form className="pick-client-create-details">
				<div className="item-0 card-bg profil"></div>
				<span className="item-1">Nume: </span>
				<input
					className="item-2"
					name="name"
					type="text"
					value={client.name}
					placeholder="name"
					onChange={handleChange}
					autoComplete="false"
				/>
				<span className="item-3">Telefon: </span>
				<input
					className="item-4"
					name="phone"
					type="text"
					value={client.phone || ""}
					placeholder="+40"
					onChange={handleChange}
					autoComplete="false"
				/>
				<span className="item-5">Adresa: </span>
				<input
					className="item-6"
					name="address"
					type="text"
					value={clientAddress}
					placeholder="Strada ..."
					onChange={handleChange}
					autoComplete="false"
				/>
				<div className="item-7 button" onClick={handleAddClient}>Adauga</div>
			</form>
		</div>
	)
}