import { useState } from "react";
import { ClientAddress } from "../../../models/Order";
import PickAddressTable from "../modals/PickAddressTable";
import Modal from "../../generic/Modal/Modal";
import Card from "../../generic/Card/Card";
import CardIcon from "../../generic/Card/CardIcon";
import CardDetails from "../../generic/Card/CardDetails";

type CardAddressProps = {
	orderId: number;
	clientId: number | null;
	address: ClientAddress | null;
}

export default function CardAddressComponent(props: CardAddressProps): JSX.Element
{
	const { orderId, clientId, address } = props;

	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function handleToggleModal(): void
	{
		setModalActive(prev => !prev);
	}

	return (
		<>
			<Card className="card hover-pointer" onClick={handleToggleModal}>
				<CardIcon>
					<div className="card-bg img-pinlocation"></div>
				</CardIcon>
				<CardDetails>
					<div className="card-title">Adresa livrare</div>
					<div className="card-text-medium">
						{address?.value}
					</div>
				</CardDetails>
			</Card>
			{
				isModalActive && clientId &&
				<Modal title="Alege adresa" toggleCallback={handleToggleModal}>
					<PickAddressTable orderId={orderId} clientId={clientId} toggleModalCallback={handleToggleModal} />
				</Modal>
			}
		</>
	);
}