import { useState } from "react";
import { Status } from "../../../models/Order";
import * as Formatter from "../../../utils/Formatting"
import PickStatusModal from "../modals/PickStatusModal";

type CardStatusProps = {
	orderId: number;
	status: Status;
	statusDate: string | null;
}

export default function CardStatusComponent(props: CardStatusProps): JSX.Element
{
	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function handleToogleModal(): void
	{
		setModalActive(prev => !prev);
	}

	return (
		<>
			<div className="card hover-pointer" onClick={handleToogleModal}>
				<div className="card-icon">
					<div className={"card-bg " + props.status.name}></div>
				</div>
				<div className="card-details">
					<div className="card-title">Stare</div>
					<div className="card-text-big first-big">{props.status.name}</div>
					<div className="card-text-medium">{Formatter.formatDate(props.statusDate)}</div>
				</div>
			</div>
			{
				isModalActive && <PickStatusModal orderId={props.orderId} toogleModalCallback={handleToogleModal} />
			}
		</>
	);
}
