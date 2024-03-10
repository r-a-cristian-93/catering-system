import { QueryClient, useQueryClient } from "react-query";
import { updateOrder } from "../../../controllers/OrderController";
import { Order, Status } from "../../../models/Order";
import { QueryKeysOrder } from "../../../QueryKeys/QueryKeysOrder";
import { RoleEnum, User } from "../../../models/User";
import { QueryKeysUser } from "../../../QueryKeys/QueryKeysUser";

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
		<div className="card-small hover-pointer" onClick={handleSelect}>
			<div className="card-icon-small">
				<div className={"card-bg " + status.name}></div>
			</div>
			<div className="card-details-small">
				<div className="card-text-medium">{status.name}</div>
			</div>
		</div>
	)
}