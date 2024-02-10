import { useState } from "react";
import { ClientAddress } from "../../../models/Order";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import PickAddress from "./PickAddress";
import { QueryKeysAddress } from "../../../QueryKeys/QueryKeysAddress";
import { getAddresses } from "../../../controllers/AddressControllere";

type PickAddressModalProps = {
	orderId: number;
	clientId: number;
	toogleModalCallback: () => void;
};

export default function PickAddressModal(props: PickAddressModalProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { orderId, clientId, toogleModalCallback } = props;

	const [ clientAddresses, setClientAddresses ] = useState<ClientAddress[] | null>(
		queryClient.getQueryData<ClientAddress[]>(QueryKeysAddress.byClientId(clientId)) || null
	);

	useQuery<ClientAddress[]>({
		queryKey: QueryKeysAddress.byClientId(clientId),
		queryFn: () => getAddresses(clientId),
		onSuccess: (responseData) =>
		{
			setClientAddresses(responseData);
		},
		staleTime: Infinity,
	});

	return (
		<div className="modal pick-modal">
			<div className="modal-container">
				<div className="modal-box">
					<div className="modal-top">
						<h2 className="modal-title">Alege adresa de livrare</h2>
						<span className="modal-close no-print" onClick={toogleModalCallback}>
							×
						</span>
					</div>
					<div className="modal-content">

						<table id="pick-table" className="full table-list">
							<thead>
								<tr>
									<th>Adresa</th>
								</tr>
							</thead>
							<tbody>
								{clientAddresses?.map(
									(clientAddress) =>
										clientAddress.id > 0 && (
											<PickAddress
												key={clientAddress.id}
												orderId={orderId}
												address={clientAddress}
												toogleModalCallback={toogleModalCallback}
											/>
										)
								)}
							</tbody>
						</table>
						<br />
						<div>
							<button className="button" type="button">
								<img
									src="/img/register-client.svg"
									style={{ filter: "invert(1)", marginRight: "12px" }}
								/>
								<span>Inregistreaza o noua adresa</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
