import { Order } from "../models/Order/Order";
import * as Formatter from "../utils/Formatting";

type OrderProgressProps = {
	order: Order;
}

export default function OrderProgress(props: OrderProgressProps): JSX.Element
{
	const {order} = props;

	return (<div className="stepper-wrapper">
		<div className="stepper-item completed">
			<div className="step-counter"></div>
			<div className="step-name">Preluare</div>
			<div className="step-date">
				{Formatter.formatDate(order.placementDate || "")}
				{" " + Formatter.formatTime(order.placementDate || "")}
			</div>
		</div>
		<div className="stepper-item completed">
			<div className="step-counter"></div>
			<div className="step-name">Aprovizionare</div>
			<div className="step-date">
				{Formatter.formatDate(order.supplyDate || "")}
				{" " + Formatter.formatTime(order.supplyDate || "")}
			</div>
		</div>
		<div className="stepper-item completed">
			<div className="step-counter"></div>
			<div className="step-name">Preparare</div>
			<div className="step-date">
				{Formatter.formatDate(order.productionDate || "")}
				{" " + Formatter.formatTime(order.productionDate || "")}
			</div>
		</div>
		<div className="stepper-item completed">
			<div className="step-counter"></div>
			<div className="step-name">Pregatire</div>
			<div className="step-date">
				{Formatter.formatDate(order.preparingDate || "")}
				{" " + Formatter.formatTime(order.preparingDate || "")}
			</div>
		</div>
		<div className="stepper-item completed">
			<div className="step-counter"></div>
			<div className="step-name">Expediere</div>
			<div className="step-date">
				{Formatter.formatDate(order.shippingDate || "")}
				{" " + Formatter.formatTime(order.shippingDate || "")}
			</div>
		</div>
	</div>)
}