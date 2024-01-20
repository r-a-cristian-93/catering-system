import { Status } from "../models/Order/Order";
import * as Formatter from "../utils/Formatting"

type CardStatusProps = {
    status: Status;
    statusDate: string | null;
}


export default function CardStatusComponent(props: CardStatusProps): JSX.Element
{
    return (
        <>
            <div className="card">
                <div className="card-icon">
                    <div className={"card-bg " + props.status.name}></div>
                </div>
                <div className="card-details">
                    <div className="card-title">Stare</div>
                    <div className="card-text-big first-big">{props.status.name}</div>
                    <div className="card-text-medium">{Formatter.formatDate(props.statusDate)}</div>
                </div>
            </div>
        </>
    );
}
