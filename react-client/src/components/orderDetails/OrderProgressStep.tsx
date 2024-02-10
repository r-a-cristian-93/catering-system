import { setNextOrderState } from "../../controllers/OrderController";
import { Order } from "../../models/Order";
import * as Formatter from "../../utils/Formatting"
import { OrderStep } from "./OrderProgress";

export type OrderProgressStepProps = {
	orderId: number;
	step: OrderStep;
	setStateSuccessfullCallback: (order: Order) => void;
}

export default function OrderProgressStep(props: OrderProgressStepProps): JSX.Element
{
	function handleClick(): void
	{
		if (!props.step.date)
			{
			void setNextOrderState(props.orderId).then((order) =>
			{
				props.setStateSuccessfullCallback(order)
			});
		}
	}

	return (
		<div className={"stepper-item hover-pointer" + (props.step.date ? " completed" : "")} onClick={handleClick}>
			<div className="step-counter"></div>
			<div className="step-name">{props.step.name}</div>
			<div className="step-date">
				{Formatter.formatDate(props.step.date)}
				{" " + Formatter.formatTime(props.step.date)}
			</div>
		</div>
	);
}