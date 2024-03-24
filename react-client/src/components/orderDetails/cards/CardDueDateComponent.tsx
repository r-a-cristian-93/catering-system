import { useState } from "react";
import * as Formatter from "../../../utils/Formatting"
import { updateOrder } from "../../../controllers/OrderController";
import Card from "../../generic/Card/Card";
import CardIcon from "../../generic/Card/CardIcon";
import CardDetails from "../../generic/Card/CardDetails";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";

export default function CardDueDateComponent(): JSX.Element
{

	const { order } = useOrderDetailsContext();
	const [ dateString, setDateString ] = useState<string>(Formatter.formatDateString(order?.dueDate || ''));
	const [ timeString, setTimeString ] = useState<string>(Formatter.formatTimeString(order?.dueDate || ''));

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
		if (order)
		{
			const dueDate = Formatter.dateFromDateTimeString(dateString, timeString).toISOString()

			void updateOrder({ ...order, dueDate: dueDate });
		}
	}

	return (
		<Card>
			<CardIcon>
				<div className="card-bg img-hourglass"></div>
			</CardIcon>
			<CardDetails>
				<div className="card-title">Termen livrare</div>
				<div className="card-text-medium">
					<input type="date" value={dateString} onChange={handleDateChange} onBlur={handleUpdate} />
				</div>
				<div className="card-text-big">
					<input type="time" value={timeString} onChange={handleTimeChange} onBlur={handleUpdate} />
				</div>
			</CardDetails>
		</Card>
	);
}
