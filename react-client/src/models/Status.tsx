export type Status = {
	name: StatusEnum;
};

export enum StatusEnum {
	ANULATA = "anulata",
	APROVIZIONATA = "aprovizionata",
	EXPEDIATA = "expediata",
	PREGATITA = "pregatita",
	PRELUATA = "preluata",
	PREPARATA = "preparata",
}