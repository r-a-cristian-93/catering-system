import { useState } from "react";
import { Client } from "../models/Order/Order";
import { getClients } from "../controllers/ClientController";
import PickClient from "./PickClient";
import PickClientCreateNew from "./PickClientCreateNew";
import { useQuery } from "react-query";
import { QueryKeysClient } from "../QueryKeys/QueryKeysClient";

type PickClientModalProps = {
	orderId: number;
	toogleModalCallback: () => void;
}

export default function PickClientModal(props: PickClientModalProps): JSX.Element
{
	const [ clients, setClients ] = useState<Client[] | null>(null);
	const { orderId, toogleModalCallback } = props;

	useQuery<Client[]>({
		queryKey: QueryKeysClient.all,
		queryFn: () => getClients(),
		onSuccess: (clients) =>
		{
			console.log(clients);
			setClients(clients);
		},
	});

	return (
		<div className="modal pick-client-modal">
			<div className="modal-container">
				<div className="modal-box">
					<div className="modal-top">
						<h2 className="modal-title">Alege client</h2>
						<span className="modal-close no-print" onClick={toogleModalCallback}>×</span>
					</div>
					<div className="modal-content">
						<div className="search-bar">
							<input type="search" name="search" placeholder="Cauta..." />
							<button className="search-magnifier">
								<img width="20px" height="20px" src="/img/search.svg" />
							</button>
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
									clients?.map(client => client.id > 0 &&
										<PickClient
											key={client.id}
											orderId={orderId}
											client={client}
											toogleModalCallback={toogleModalCallback}
										/>
									)
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