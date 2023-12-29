import Client from "../models/Client";
import Address from "./Address";
import Status from "../models/Status";

type OrderDetails = {
	id: number;
	client: Client;
	status: Status;
	ingCost: number;
	placementDate: string;
	dueDate: string;
	supplyDate: string;
	productionDate: string;
	preparingDate: string;
	shippingDate: string;
	cancelDate: string | null;
	shoppingListId: number;
	deliveryAddress: Address;
};

export default OrderDetails;
