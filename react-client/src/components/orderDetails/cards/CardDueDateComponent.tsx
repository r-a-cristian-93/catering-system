import { useState } from "react";
import * as Formatter from "../../../utils/Formatting"
import { Order } from "../../../models/Order";
import { updateOrder } from "../../../controllers/OrderController";
import Card from "../../generic/Card/Card";

type CardProps = {
	date: string;
	orderId: number;
};

export default function CardDueDateComponent(props: CardProps): JSX.Element
{
	const { orderId, date } = props;

	const [ dateString, setDateString ] = useState<string>(Formatter.formatDateString(date));
	const [ timeString, setTimeString ] = useState<string>(Formatter.formatTimeString(date));

	function handleDateChange(event: React.ChangeEvent<HTMLInputElement>): void
	{
		setDateString(event.target.value);
	}

	function handleTimeChange(event: React.ChangeEvent<HTMLInputElement>): void
	{
		setTimeString(event.target.value);
	}

	function handleUpdate(): void
	{
		const order: Order = {
			id: orderId,
			dueDate: Formatter.dateFromDateTimeString(dateString, timeString).toISOString()
		} as Order;

		void updateOrder(order);
	}

	return (
		<Card>
			<div className="card-icon">
				<div className="card-bg img-hourglass"></div>
			</div>
			<div className="card-details">
				<div className="card-title">Termen livrare</div>
				<div className="card-text-medium">
					<input type="date" value={dateString} onChange={handleDateChange} onBlur={handleUpdate} />
				</div>
				<div className="card-text-big">
					<input type="time" value={timeString} onChange={handleTimeChange} onBlur={handleUpdate} />
				</div>
			</div>
		</Card>
	);
}
