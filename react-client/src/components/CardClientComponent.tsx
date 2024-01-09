import { useState } from "react";
import { Client } from "../models/Order/Order";
import PickClientModal from "./PickClientModal";

type CardClientProps = {
	client: Client | null;
}

export default function CardClient(props: CardClientProps): JSX.Element
{
	const { client } = props;

	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function handleToogleModal(): void
	{
		setModalActive(prev => !prev);
	}

	return (
		<div className="card">
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
			{
				isModalActive && <PickClientModal toogleModalCallback={handleToogleModal}/>
			}
		</div>
	);
}