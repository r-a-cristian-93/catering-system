import { useState } from "react";
import { Client, ClientAddress, Order} from "../../../models/Order";
import { addClient } from "../../../controllers/ClientController";
import { addAddress } from "../../../controllers/AddressControllere";
import { updateOrder } from "../../../controllers/OrderController";
import { QueryKeysOrder } from "../../../QueryKeys/QueryKeysOrder";
import { QueryClient, useQueryClient } from "react-query";

type PickClientCreateNewProps = {
	orderId: number;
	toogleModalCallback: () => void;
}

export default function PickClientCreateNew(props: PickClientCreateNewProps): JSX.Element
{
	const [ client, setClient ] = useState<Client>({} as Client);
	const [ clientAddress, setClientAddress ] = useState<ClientAddress>({} as ClientAddress);

	const queryClient: QueryClient = useQueryClient();

	function handleAddClient(): void
	{
		void addClient(client).then((newClient: Client) =>
		{
			clientAddress.clientId = newClient.id;

			void addAddress(clientAddress).then(() =>
			{
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
		});
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
		<div className="pick-client-create-box">
			<form className="pick-client-create-details">
				<div className="item-0 card-bg profil"></div>
				<span className="item-1">Nume: </span>
				<input
					className="item-2"
					name="name"
					type="text"
					value={client.name}
					placeholder="name"
					onChange={handleChange}
					autoComplete="false"
				/>
				<span className="item-3">Telefon: </span>
				<input
					className="item-4"
					name="phone"
					type="text"
					value={client.phone || ""}
					placeholder="+40"
					onChange={handleChange}
					autoComplete="false"
				/>
				<span className="item-5">Adresa: </span>
				<input
					className="item-6"
					name="address"
					type="text"
					value={clientAddress.value}
					placeholder="Strada ..."
					onChange={handleChange}
					autoComplete="false"
				/>
				<div className="item-7 button" onClick={handleAddClient}>Adauga</div>
			</form>
		</div>
	)
}