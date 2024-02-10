import { PageableResponse } from "./Pageable";

export type Unit = {
    name: string;
}

export type Category = {
    name: string;
}

export type Recipe = {
    id: number;
    name: string;
    quantity: number;
    unit: Unit;
    category: Category;
    ingCost: number;
}

export type RecipesResponseData = PageableResponse & {
	content: Recipe[];
};