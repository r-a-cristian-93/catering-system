import { useState } from "react";
import { Order, StatusEnum } from "../../../models/Order";
import * as Formatter from "../../../utils/Formatting"
import PickStatusList from "../modals/PickStatusList";
import Modal from "../../generic/Modal/Modal";
import Card from "../../generic/Card/Card";
import CardIcon from "../../generic/Card/CardIcon";
import CardDetails from "../../generic/Card/CardDetails";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";

export default function CardStatusComponent(): JSX.Element
{
	const { order } = useOrderDetailsContext();
	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	getCurrentStatusDate(order);

	function handleToggleModal(): void
	{
		setModalActive(prev => !prev);
	}

	return (
		<>
			<Card className="hover-pointer" onClick={handleToggleModal}>
				<CardIcon>
					<div className={"card-bg " + order?.status.name}></div>
				</CardIcon>
				<CardDetails>
					<div className="card-title">Stare</div>
					<div className="card-text-big">{order?.status.name}</div>
					<div className="card-text-medium">{Formatter.formatDate(getCurrentStatusDate(order))}</div>
				</CardDetails>
			</Card>
			{
				isModalActive &&
				<Modal title="Alege starea comenzii" toggleCallback={handleToggleModal}>
					<PickStatusList toggleModalCallback={handleToggleModal} />
				</Modal>
			}
		</>
	);
}

function getCurrentStatusDate(order: Order | null): string | null
{
	const {
		status,
		placementDate,
		supplyDate,
		productionDate,
		preparingDate,
		shippingDate,
		cancelDate,
	} = order || {} as Order;

	switch (status.name)
	{
		case StatusEnum.PRELUATA:
			return placementDate;
		case StatusEnum.APROVIZIONATA:
			return supplyDate;
		case StatusEnum.PREPARATA:
			return productionDate;
		case StatusEnum.PREGATITA:
			return preparingDate;
		case StatusEnum.EXPEDIATA:
			return shippingDate;
		case StatusEnum.ANULATA:
			return cancelDate;
		default:
			return ""
	}
}