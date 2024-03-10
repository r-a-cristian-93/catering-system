import { useState } from "react";
import { Client } from "../../../models/Order";
import PickClientOptions from "../modals/PickClientOptions";
import Modal from "../../generic/Modal/Modal";

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
			<div className="card hover-pointer">
				<div className="card-icon">
					<div className="card-bg profil"></div>
				</div>
				<div className="card-details" onClick={handleToggleModal}>
					<div className="card-title">Client</div>
					<div className="card-text-big">
						{client?.name}
					</div>
					<div className="card-text-medium">
						{client?.phone}
					</div>
				</div>
			</div>
			{
				isModalActive &&
				<Modal title="Alege client" toggleCallback={handleToggleModal}>
					<PickClientOptions orderId={orderId} toggleModalCallback={handleToggleModal} />
				</Modal>
			}
		</>
	);
}