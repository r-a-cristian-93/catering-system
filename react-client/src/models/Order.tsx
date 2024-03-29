import { PageableResponse } from "./Pageable";
import { Recipe } from "./Recipe";

export type Client = {
	id: number;
	name: string;
	phone: string | null;
	address: ClientAddress | null;
};

export type ClientAddress = {
	id: number;
	value: string | null;
	latitude: number | null;
	longitude: number | null;
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
};

export type OrdersResponseData = PageableResponse & {
	content: Order[];
};

export type ClientResponseData = PageableResponse & {
	content: Client[];
};

export type OrderItem = {
	id: number;
	orderId: number;
	recipe: Recipe;
	servings: number;
};
