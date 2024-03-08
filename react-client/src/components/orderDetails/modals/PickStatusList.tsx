import { useState } from "react";
import { Status } from "../../../models/Order";
import PickStatus from "./PickStatus";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QueryKeysStatus } from "../../../QueryKeys/QueryKeysStatus";
import getStatusList from "../../../controllers/StatusController";

type PickStatusListProps = {
	orderId: number;
	toggleModalCallback: () => void;
};

export default function PickStatusList(props: PickStatusListProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { orderId, toggleModalCallback } = props;

	const [ statusList, setStatusList ] = useState<Status[] | null>(
		queryClient.getQueryData<Status[] | null>(QueryKeysStatus.all) || null
	);

	useQuery<Status[]>({
		queryKey: QueryKeysStatus.all,
		queryFn: () => getStatusList(),
		onSuccess: (statusList) =>
		{
			setStatusList(statusList);
		},
		staleTime: Infinity
	});

	return (
		<div className="cards-small">
			{
				statusList && statusList.map((status, index) =>
				{
					return <PickStatus
						key={index}
						orderId={orderId}
						status={status}
						toogleModalCallback={toggleModalCallback}
					/>
				})
			}
			<br />
		</div>
	);
}
