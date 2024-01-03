import { Order } from "../models/Order/Order";
import OrderProgressStep, { OrderProgressStepProps } from "./OrderProgressStep";

type OrderProgressProps = {
	order: Order;
}

export default function OrderProgress(props: OrderProgressProps): JSX.Element
{
	const { order } = props;

	const steps: OrderProgressStepProps[] = [
		{ name: "Preluare", date: order.placementDate },
		{ name: "Aprovizionare", date: order.supplyDate },
		{ name: "Preparare", date: order.productionDate },
		{ name: "Pregatire", date: order.preparingDate },
		{ name: "Expediere", date: order.shippingDate }
	];

	return (
		<div className="stepper-wrapper">
			{
				steps.map((step, index) => (
					<OrderProgressStep key={index} name={step.name} date={step.date} />
				))
			}
		</div>
	);
}