import Client from "../models/Client";
import Address from "../models/Address";
import Status from "../models/Status";

type Order = {
	id: number;
	client: Client | null;
	status: Status;
	ingCost: number | null;
	placementDate: string;
	dueDate: string;
	supplyDate: string | null;
	productionDate: string | null;
	preparingDate: string | null;
	shippingDate: string | null;
	cancelDate: string | null;
	shoppingListId: number;
	deliveryAddress: Address | null;
};

export default Order;