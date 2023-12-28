import Client from "../models/Client";
import DeliveryAddress from "../models/DeliveryAddress";
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
	deliveryAddress: DeliveryAddress;
};

export default OrderDetails;
