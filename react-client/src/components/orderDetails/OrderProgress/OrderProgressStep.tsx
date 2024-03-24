import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";
import { setNextOrderState } from "../../../controllers/OrderController";
import * as Formatter from "../../../utils/Formatting"
import { OrderStep } from "./OrderProgress";
import css from "./OrderProgress.module.css"

export type OrderProgressStepProps = {
	step: OrderStep;
}

export default function OrderProgressStep(props: OrderProgressStepProps): JSX.Element
{
	const { order, refetchOrder } = useOrderDetailsContext();

	function handleClick(): void
	{
		if (order)
			void setNextOrderState(order.id).then(refetchOrder);
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