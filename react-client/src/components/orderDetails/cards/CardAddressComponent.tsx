import { useState } from "react";
import { Address } from "../../../models/Order";
import PickAddressModal from "../modals/PickAddressModal";

type CardAddressProps = {
	orderId: number;
    address: Address | null;
}

export default function CardAddressComponent(props: CardAddressProps): JSX.Element
{
	const { orderId, address } = props;

	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function handleToogleModal(): void
	{
		setModalActive(prev => !prev);
	}

	return (
		<>
		<div className="card hover-pointer">
			<div className="card-icon">
				<div className="card-bg img-pinlocation"></div>
			</div>
			<div className="card-details" onClick={handleToogleModal}>
				<div className="card-title">Adresa livrare</div>
				<div className="card-text-medium">
					{address?.value}
				</div>
			</div>
		</div>
		{
			isModalActive && <PickAddressModal orderId={orderId} toogleModalCallback={handleToogleModal}/>
		}
		</>
	);
}