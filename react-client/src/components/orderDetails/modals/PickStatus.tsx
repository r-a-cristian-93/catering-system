import { QueryClient, useQueryClient } from "react-query";
import { updateOrder } from "../../../controllers/OrderController";
import { Order, Status } from "../../../models/Order";
import { QueryKeysOrder } from "../../../QueryKeys/QueryKeysOrder";
import { RoleEnum, User } from "../../../models/User";
import { QueryKeysUser } from "../../../QueryKeys/QueryKeysUser";
import CardSmall from "../../generic/Card/CardSmall";
import CardIconSmall from "../../generic/Card/CardIconSmall";
import CardDetails from "../../generic/Card/CardDetails";

type PickStatusProps = {
	orderId: number;
	status: Status;
	toogleModalCallback: () => void;
}

export default function PickStatus(props: PickStatusProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { orderId, status, toogleModalCallback } = props;

	const user: User | undefined = queryClient.getQueryData(QueryKeysUser.logedInUser);

	function handleSelect(): void
	{
		if (user?.role.name === RoleEnum.ADMIN)
		{
			const order: Order = {
				id: orderId,
				status: status,
			} as Order;

			void updateOrder(order).then((order) =>
			{
				void queryClient.invalidateQueries(QueryKeysOrder.orderById(order.id));

				toogleModalCallback();
			});
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