import { addOrder } from "../../controllers/OrdersController";
import AddButton from "../generic/AddButton/AddButton";

export default function OrdersListControls(): JSX.Element
{
	function handleAddNewOrder(): void
	{
		void addOrder().then((newOrder) =>
		{
			const path = "/comenzi/" + newOrder.id;

			window.location.pathname = path;
		});
	}

	return (
		<>
			<br />
			<AddButton text="Adauga comanda noua" onClick={handleAddNewOrder} />
		</>
	);
}
