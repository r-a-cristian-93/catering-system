import { PageableResponse } from "./Pageable";
import { Unit } from "./Recipe"

export type Ingredient = {
    id: number,
    name: string,
    price: number,
    unit: Unit
}

export type IngredientsResponseData = PageableResponse & {
    content : Ingredient[];
}

export type IngredientPriceHistory = {
    id: number,
    ingredientId: number,
    price: number,
    date: Date
}