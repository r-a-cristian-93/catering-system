import { useState } from "react";
import Modal from "../../generic/Modal/Modal";
import Card from "../../generic/Card/Card";
import CardIcon from "../../generic/Card/CardIcon";
import CardDetails from "../../generic/Card/CardDetails";
import PickAddressMap from "../modals/PickAddressMap";
import { PickAddressContextProvider } from "../../../contexts/PickAddressContext";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";

export default function CardAddressComponent(): JSX.Element
{
	const { order } = useOrderDetailsContext();
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
						{order?.client?.address?.value}
					</div>
				</CardDetails>
			</Card>
			{
				isModalActive &&
				<Modal title="Alege adresa" toggleCallback={handleToggleModal} style={{ width: "1200px" }}>
					<PickAddressContextProvider>
						<PickAddressMap />
					</PickAddressContextProvider>
				</Modal >
			}
		</>
	);
}