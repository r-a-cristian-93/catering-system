import { useState } from "react";
import { Client } from "../../../models/Order";
import PickClientModal from "../modals/PickClientModal";

type CardClientProps = {
	orderId: number;
	client: Client | null;
}

export default function CardClient(props: CardClientProps): JSX.Element
{
	const { orderId, client } = props;

	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function handleToogleModal(): void
	{
		setModalActive(prev => !prev);
	}

	return (
		<>
		<div className="card hover-pointer">
			<div className="card-icon">
				<div className="card-bg profil"></div>
			</div>
			<div className="card-details" onClick={handleToogleModal}>
				<div className="card-title">Client</div>
				<div className="card-text-big first-big">
					{client?.name}
				</div>
				<div className="card-text-medium">
					{client?.phone}
				</div>
			</div>
		</div>
		{
			isModalActive && <PickClientModal orderId={orderId} toogleModalCallback={handleToogleModal}/>
		}
		</>
	);
}