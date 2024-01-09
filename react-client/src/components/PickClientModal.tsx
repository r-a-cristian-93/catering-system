import { useEffect, useState } from "react";
import { Client } from "../models/Order/Order";
import { getClients } from "../controllers/ClientController";
import PickClient from "./PickClient";
import PickClientCreateNew from "./PickClientCreateNew";

type PickClientModalProps = {
	toogleModalCallback: () => void;
}

export default function PickClientModal(props: PickClientModalProps): JSX.Element
{
	const [ clients, setClients ] = useState<Client[] | null>(null);

	useEffect(() =>
	{
		handleClick();
	});

	function handleClick(): void
	{
		void getClients().then((clients) =>
		{
			setClients(clients);
		})
	}

	return (
		<div className="modal pick-client-modal">
			<div className="modal-container">
				<div className="modal-box">
					<div className="modal-top">
						<h2 className="modal-title">Alege client</h2>
						<span className="modal-close no-print" onClick={props.toogleModalCallback}>×</span>
					</div>
					<div className="modal-content">
						<div className="search-bar">
							<input type="search" placeholder="Cauta..." />
							<button className="search-magnifier">0</button>
						</div>
						<table id="add-item-table" className="full table-list">
							<thead>
								<tr>
									<th>Nume</th>
									<th>Telefon</th>
								</tr>
							</thead>
							<tbody>
								{
									clients?.map(client => client.id > 0 && <PickClient key={client.id} client={client} />)
								}
							</tbody>
						</table>
						<PickClientCreateNew />

					</div>
				</div>
			</div>
		</div>
	);
}