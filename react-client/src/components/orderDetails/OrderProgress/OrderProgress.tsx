import { useState } from "react";
import { Order } from "../../../models/Order";
import OrderProgressStep from "./OrderProgressStep";

type OrderProgressProps = {
	order: Order;
	setStateSuccessfullCallback: (order: Order) => void;
}

export type OrderStep = {
	name: string;
	date: string | null;
}

export default function OrderProgress(props: OrderProgressProps): JSX.Element
{
	const [ order, setOrder ] = useState<Order>(props.order);

	const steps: OrderStep[] = [
		{ name: "Preluare", date: order.placementDate },
		{ name: "Aprovizionare", date: order.supplyDate },
		{ name: "Preparare", date: order.productionDate },
		{ name: "Pregatire", date: order.preparingDate },
		{ name: "Expediere", date: order.shippingDate }
	];

	function handleSetStateSucessfull(order: Order): void
	{
		// we know that the state was set so we can safely do only optimistic update
		setOrder(order);

		// optimistic update
		props.setStateSuccessfullCallback(order);
	}

	return (
		<div className="stepper-wrapper">
			{
				steps.map((step, index) => (
					<OrderProgressStep
						key={index}
						orderId={order.id}
						step={step}
						setStateSuccessfullCallback={handleSetStateSucessfull} />
				))
			}
		</div>
	);
}