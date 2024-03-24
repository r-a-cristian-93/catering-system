import { useState } from "react";
import { Client } from "../../../models/Order";
import PickClientOptions from "../modals/PickClientOptions";
import Modal from "../../generic/Modal/Modal";
import Card from "../../generic/Card/Card";
import CardIcon from "../../generic/Card/CardIcon";
import CardDetails from "../../generic/Card/CardDetails";

type CardClientProps = {
	orderId: number;
	client: Client | null;
}

export default function CardClient(props: CardClientProps): JSX.Element
{
	const { orderId, client } = props;

	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function handleToggleModal(): void
	{
		setModalActive(prev => !prev);
	}

	return (
		<>
			<Card className="hover-pointer" onClick={handleToggleModal}>
				<CardIcon>
					<div className="card-bg profil"></div>
				</CardIcon>
				<CardDetails>
					<div className="card-title">Client</div>
					<div className="card-text-big">
						{client?.name}
					</div>
					<div className="card-text-medium">
						{client?.phone}
					</div>
				</CardDetails>
			</Card>
			{
				isModalActive &&
				<Modal title="Alege client" toggleCallback={handleToggleModal}>
					<PickClientOptions orderId={orderId} toggleModalCallback={handleToggleModal} />
				</Modal>
			}
		</>
	);
}