import { useState } from "react";
import { ClientAddress } from "../../../models/Order";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import PickAddress from "./PickAddress";
import { QueryKeysAddress } from "../../../QueryKeys/QueryKeysAddress";
import { getAddresses } from "../../../controllers/AddressControllere";
import TableList from "../../generic/TableList/TableList";

type PickAddressTableProps = {
	orderId: number;
	clientId: number;
};

export default function PickAddressTable(props: PickAddressTableProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { orderId, clientId } = props;

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
		<>
			<TableList>
				{clientAddresses?.map(
					(clientAddress) =>
						clientAddress.id > 0 && (
							<PickAddress
								key={clientAddress.id}
								orderId={orderId}
								address={clientAddress}
							/>
						)
				)}
			</TableList>
		</>
	);
}
