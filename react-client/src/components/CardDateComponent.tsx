import { useState } from "react";
import * as Formatter from "../utils/Formatting"

type CardProps = {
    date: string;
};

export default function CardDateComponent(props: CardProps): JSX.Element
{
    const { date } = props;

    const [ dateString, setDateString ] = useState<string>(Formatter.formatDateString(date));
    const [ timeString, setTimeString ] = useState<string>(Formatter.formatTimeString(date));

    console.log(Formatter.dateFromDateTimeString(dateString, timeString));

    function handleDateChange(event: React.ChangeEvent<HTMLInputElement>): void
    {
        setDateString(event.target.value);
    }

    function handleTimeChange(event: React.ChangeEvent<HTMLInputElement>): void
    {
        setTimeString(event.target.value);
    }

    return (
        <div className="card">
            <div className="card-icon">
                <div className="card-bg img-hourglass"></div>
            </div>
            <div className="card-details">
                <div className="card-title">Termen livrare</div>
                <div className="card-text-medium">
                    <input type="date" value={dateString} onChange={handleDateChange} />
                </div>
                <div className="card-text-big">
                    <input type="time" value={timeString} onChange={handleTimeChange} />
                </div>
            </div>
        </div>
    );
}
