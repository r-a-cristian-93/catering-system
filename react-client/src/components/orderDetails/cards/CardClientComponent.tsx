import { useState } from "react";
import PickClientOptions from "../modals/PickClientOptions";
import Modal from "../../generic/Modal/Modal";
import Card from "../../generic/Card/Card";
import CardIcon from "../../generic/Card/CardIcon";
import CardDetails from "../../generic/Card/CardDetails";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";

export default function CardClient(): JSX.Element
{
	const { order } = useOrderDetailsContext();
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
						{order?.client?.name}
					</div>
					<div className="card-text-medium">
						{order?.client?.phone}
					</div>
				</CardDetails>
			</Card>
			{
				isModalActive &&
				<Modal title="Alege client" toggleCallback={handleToggleModal}>
					<PickClientOptions toggleModalCallback={handleToggleModal} />
				</Modal>
			}
		</>
	);
}