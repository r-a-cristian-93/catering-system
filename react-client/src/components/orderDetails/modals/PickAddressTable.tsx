import { useEffect, useState } from "react";
import { ClientAddress } from "../../../models/Order";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import PickAddress from "./PickAddress";
import { QueryKeysAddress } from "../../../QueryKeys/QueryKeysAddress";
import { getAddresses } from "../../../controllers/AddressControllere";
import TableList from "../../generic/TableList/TableList";
import axios from "axios";

type PickAddressTableProps = {
	orderId: number;
	clientId: number;
	toggleModalCallback: () => void;
};

export default function PickAddressTable(props: PickAddressTableProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { orderId, clientId, toggleModalCallback } = props;

	const [ clientAddresses, setClientAddresses ] = useState<ClientAddress[] | null>(
		queryClient.getQueryData<ClientAddress[]>(QueryKeysAddress.byClientId(clientId)) || null
	);


	useEffect(() =>
	{
		void axios.get<NominatimReverseResponse>('https://nominatim.openstreetmap.org/reverse?lat=50&lon=1&format=json').then((response) =>
		{
			console.log(response.data);
		})
	}, [])


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
		<>
			<TableList>
				{clientAddresses?.map(
					(clientAddress) =>
						clientAddress.id > 0 && (
							<PickAddress
								key={clientAddress.id}
								orderId={orderId}
								address={clientAddress}
								toggleModalCallback={toggleModalCallback}
							/>
						)
				)}
			</TableList>
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
		</>
	);
}
