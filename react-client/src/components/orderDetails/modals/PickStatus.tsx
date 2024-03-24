import { QueryClient, useQueryClient } from "react-query";
import { updateOrder } from "../../../controllers/OrderController";
import { Status } from "../../../models/Order";
import { RoleEnum, User } from "../../../models/User";
import { QueryKeysUser } from "../../../QueryKeys/QueryKeysUser";
import CardSmall from "../../generic/Card/CardSmall";
import CardIconSmall from "../../generic/Card/CardIconSmall";
import CardDetails from "../../generic/Card/CardDetails";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";

type PickStatusProps = {
	status: Status;
	toogleModalCallback: () => void;
}

export default function PickStatus(props: PickStatusProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { status, toogleModalCallback } = props;
	const { order, refetchOrder } = useOrderDetailsContext();

	const user: User | undefined = queryClient.getQueryData(QueryKeysUser.logedInUser);

	function handleSelect(): void
	{
		if (user?.role.name === RoleEnum.ADMIN && order)
		{
			void updateOrder({ ...order, status: status })
				.then(refetchOrder)
				.then(toogleModalCallback);
		}
	}

	return (
		<CardSmall onClick={handleSelect}>
			<CardIconSmall>
				<div className={"card-bg " + status.name}></div>
			</CardIconSmall>

			<CardDetails>
				<div className="card-text-medium">{status.name}</div>
			</CardDetails>
		</CardSmall>
	)
}