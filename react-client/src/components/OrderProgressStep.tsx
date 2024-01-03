import * as Formatter from "../utils/Formatting"

export type OrderProgressStepProps = {
	name: string;
	date: string | null;
}

export default function OrderProgressStep(props: OrderProgressStepProps): JSX.Element
{
	return (<div className={"stepper-item" + (props.date ? " completed" : "")}>
		<div className="step-counter"></div>
		<div className="step-name">{props.name}</div>
		<div className="step-date">
			{Formatter.formatDate(props.date)}
			{" " + Formatter.formatTime(props.date)}
		</div>
	</div>)
}