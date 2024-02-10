import { PageableResponse } from "./Pageable";
import { Recipe } from "./Recipe";

export type Client = {
	id: number;
	name: string;
	phone: string | null;
};

export type Address = {
	id: number;
	value: string | null;
};

export type ClientAddress = {
	id: number;
	clientId: number;
	address: Address;
}

export type Status = {
	name: StatusEnum;
};

export enum StatusEnum
{
	ANULATA = "anulata",
	APROVIZIONATA = "aprovizionata",
	EXPEDIATA = "expediata",
	PREGATITA = "pregatita",
	PRELUATA = "preluata",
	PREPARATA = "preparata",
}

export type Order = {
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

export type OrdersResponseData = PageableResponse & {
	content: Order[];
};

export type ClientResponseData = PageableResponse & {
	content: Client[];
};

export type AddressResponseData = PageableResponse & {
	content: Address[];
}

export type OrderItem = {
	id: number;
	order: Order;
	recipe: Recipe;
	servings: number;
};
