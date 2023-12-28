import { Client } from "../models/Client";
import { DeliveryAddress } from "../models/DeliveryAddress";
import { Status } from "../models/Status";


export type Order = {
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
	deliveryAddress: DeliveryAddress;
};
