import { useState } from "react";
import { Client, ClientAddress, Order } from "../../../../models/Order";
import { addClient } from "../../../../controllers/ClientController";
import { addAddress } from "../../../../controllers/AddressControllere";
import { updateOrder } from "../../../../controllers/OrderController";
import { QueryKeysOrder } from "../../../../QueryKeys/QueryKeysOrder";
import { QueryClient, useQueryClient } from "react-query";
import useFocus from "../../../../hooks/UseFocus";
import css from "./PickClientCreateNew.module.css"

type PickClientCreateNewProps = {
	orderId: number;
	toogleModalCallback: () => void;
}

export default function PickClientCreateNew(props: PickClientCreateNewProps): JSX.Element
{
	const [ client, setClient ] = useState<Client>({} as Client);
	const [ clientAddress, setClientAddress ] = useState<ClientAddress>({} as ClientAddress);
	const inputFieldName = useFocus<HTMLInputElement>();

	const queryClient: QueryClient = useQueryClient();

	function handleAddClient(): void
	{
		void addClient(client).then((newClient: Client) =>
		{
			// clientAddress.clientId = newClient.id;

			// void addAddress(clientAddress).then((newAddress: ClientAddress) =>
			// {
			const order: Order = {
				id: props.orderId,
				client: client,
			} as Order;

			void updateOrder(order).then((order) =>
			{
				void queryClient.invalidateQueries(QueryKeysOrder.orderById(order.id));

				props.toogleModalCallback();
			});
		}
		)
		// });
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
	{
		const { name, value } = event.target;

		if (name === "address")
			setClientAddress((prev) =>
			{
				return {
					...prev,
					value: value
				}
			});

		setClient((prev) =>
		{
			return {
				...prev,
				[ name ]: value,
			};
		});
	}

	return (
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
				<span className={css.item_5}>Adresa: </span>
				<input
					className={css.item_6}
					name="address"
					type="text"
					value={clientAddress.value}
					placeholder="Strada ..."
					onChange={handleChange}
					autoComplete="false"
				/>
				<div className={css.item_7 + " button hover-pointer"} onClick={handleAddClient}>Adauga</div>
			</form>
		</div>
	)
}