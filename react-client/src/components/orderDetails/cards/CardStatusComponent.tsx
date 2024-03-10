import { useState } from "react";
import { Status } from "../../../models/Order";
import * as Formatter from "../../../utils/Formatting"
import PickStatusList from "../modals/PickStatusList";
import Modal from "../../generic/Modal/Modal";
import Card from "../../generic/Card/Card";
import CardIcon from "../../generic/Card/CardIcon";

type CardStatusProps = {
	orderId: number;
	status: Status;
	statusDate: string | null;
}

export default function CardStatusComponent(props: CardStatusProps): JSX.Element
{
	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function handleToggleModal(): void
	{
		setModalActive(prev => !prev);
	}

	return (
		<>
			<Card className="hover-pointer" onClick={handleToggleModal}>
				<CardIcon>
					<div className={"card-bg " + props.status.name}></div>
				</CardIcon>
				<div className="card-details">
					<div className="card-title">Stare</div>
					<div className="card-text-big">{props.status.name}</div>
					<div className="card-text-medium">{Formatter.formatDate(props.statusDate)}</div>
				</div>
			</Card>
			{
				isModalActive &&
				<Modal title="Alege starea comenzii" toggleCallback={handleToggleModal}>
					<PickStatusList orderId={props.orderId} toggleModalCallback={handleToggleModal} />
				</Modal>
			}
		</>
	);
}
