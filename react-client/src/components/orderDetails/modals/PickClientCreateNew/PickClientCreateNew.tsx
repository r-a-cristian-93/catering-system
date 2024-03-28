import { useState } from "react";
import { Client, ClientAddress } from "../../../../models/Order";
import { addClient } from "../../../../controllers/ClientController";
import { addAddress } from "../../../../controllers/AddressControllere";
import { updateOrder } from "../../../../controllers/OrderController";
import useFocus from "../../../../hooks/UseFocus";
import css from "./PickClientCreateNew.module.css"
import { useOrderDetailsContext } from "../../../../contexts/OrderDetailsContext";
import PickAddressMap from "../PickAddressMap";
import { usePickAddressContext } from "../../../../contexts/PickAddressContext";

type PickClientCreateNewProps = {
	toogleModalCallback: () => void;
}

export default function PickClientCreateNew(props: PickClientCreateNewProps): JSX.Element
{
	const [ client, setClient ] = useState<Client>({} as Client);
	const { order, refetchOrder } = useOrderDetailsContext();
	const { label, markerPosition } = usePickAddressContext();
	const inputFieldName = useFocus<HTMLInputElement>();

	function handleAddClient(): void
	{
		if (client && order && markerPosition && label)
		{
			const clientAddress: ClientAddress = {
				value: label,
				latitude: markerPosition[ 0 ],
				longitude: markerPosition[ 1 ]
			} as ClientAddress;

			void addAddress(clientAddress).then((newAddress) =>
			{
				void addClient({ ...client, address: newAddress }).then((newClient) =>
				{
					void updateOrder({ ...order, client: newClient }).then(refetchOrder).then(props.toogleModalCallback);
				});
			});
		}
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
	{
		const { name, value } = event.target;

		setClient((prev) =>
		{
			return {
				...prev,
				[ name ]: value,
			};
		});
	}

	return (
		<>
			<div className={css.pick_client_create_box}>
				<form className={css.pick_client_create_details}>
					<div className={css.item_0 + " card-bg profil"}></div>
					<span className={css.item_1}>Nume: </span>
					<input
						className={css.item_2}
						name="name"
						type="text"
						value={client.name}
						placeholder="Nume"
						onChange={handleChange}
						autoComplete="false"
						ref={inputFieldName}
					/>
					<span className={css.item_3}>Telefon: </span>
					<input
						className={css.item_4}
						name="phone"
						type="text"
						value={client.phone || ""}
						placeholder="+40"
						onChange={handleChange}
						autoComplete="false"
					/>
					<div className={css.item_5 + " button hover-pointer"} onClick={handleAddClient}>Adauga</div>
				</form>
			</div>
			<PickAddressMap />
		</>
	)
}