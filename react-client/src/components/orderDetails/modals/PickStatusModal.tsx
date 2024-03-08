import { useState } from "react";
import { Status } from "../../../models/Order";
import PickStatus from "./PickStatus";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QueryKeysStatus } from "../../../QueryKeys/QueryKeysStatus";
import getStatusList from "../../../controllers/StatusController";

type PickStatusModalProps = {
	orderId: number;
	toogleModalCallback: () => void;
};

export default function PickStatusModal(props: PickStatusModalProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { orderId, toogleModalCallback } = props;

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
		<div className="modal">
			<div className="modal-container">
				<div className="modal-box">
					<div className="modal-top">
						<h2 className="modal-title">Alege starea comenzii</h2>
						<span className="modal-close no-print" onClick={toogleModalCallback}>
							×
						</span>
					</div>
					<div className="modal-content">
						<div className="cards-small">
							{
								statusList && statusList.map((status, index) =>
								{
									return <PickStatus
										key={index}
										orderId={orderId}
										status={status}
										toogleModalCallback={toogleModalCallback}
									/>
								})
							}
							<br />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
