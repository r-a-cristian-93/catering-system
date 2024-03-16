import { setNextOrderState } from "../../../controllers/OrderController";
import { Order } from "../../../models/Order";
import * as Formatter from "../../../utils/Formatting"
import { OrderStep } from "./OrderProgress";
import css from "./OrderProgress.module.css"

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
		<div className={css.stepper_item + " hover-pointer" + (props.step.date ? (" " + css.completed) : "")} onClick={handleClick}>
			<div className={css.step_counter}></div>
			<div className={css.step_name}>{props.step.name}</div>
			<div className={css.step_date}>
				{Formatter.formatDate(props.step.date)}
				{" " + Formatter.formatTime(props.step.date)}
			</div>
		</div>
	);
}