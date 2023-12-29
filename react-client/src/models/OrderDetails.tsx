import Client from "../models/Client";
import Address from "../models/Address";
import {Status} from "../models/Status";

type OrderDetails = {
	id: number;
	client: Client;
	status: Status;
	ingCost: number;
	placementDate: string;
	dueDate: string;
	supplyDate: string | null;
	productionDate: string | null;
	preparingDate: string | null;
	shippingDate: string | null;
	cancelDate: string | null;
	shoppingListId: number;
	deliveryAddress: Address;
};

export default OrderDetails;
