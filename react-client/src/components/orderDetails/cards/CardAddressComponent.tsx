import { useState } from "react";
import Modal from "../../generic/Modal/Modal";
import Card from "../../generic/Card/Card";
import CardIcon from "../../generic/Card/CardIcon";
import CardDetails from "../../generic/Card/CardDetails";
import PickAddressMap from "../modals/PickAddressMap";
import { usePickAddressContext } from "../../../contexts/PickAddressContext";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";
import { ClientAddress } from "../../../models/Order";
import { updateAddress } from "../../../controllers/AddressControllere";

export default function CardAddressComponent(): JSX.Element
{
	const { order, refetchOrder } = useOrderDetailsContext();
	const [ isModalActive, setModalActive ] = useState<boolean>(false);
	const { label, markerPosition } = usePickAddressContext();

	function handleToggleModal(): void
	{
		setModalActive(prev => !prev);
	}

	function handleSetAddress(): void
	{
		if (markerPosition && label && order?.client?.address)
		{
			const address: ClientAddress = {
				...order.client.address,
				value: label,
				latitude: markerPosition[ 0 ],
				longitude: markerPosition[ 1 ]
			}

			void updateAddress(address).then(refetchOrder);
		}
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
					<PickAddressMap>
						<div className="sticky-address-label">
							{
								label &&
								<div>
									{label}
									{/* // hide this when creating new client? */}
									<button className={"button"} style={{ marginLeft: "40px" }} onClick={handleSetAddress}>Foloseste aceasta adresa</button>
								</div>
							}
							<div>
								<span>Adresa curentă: </span>
								{order?.client?.address?.value}
							</div>
						</div>
					</PickAddressMap>
				</Modal >
			}
		</>
	);
}