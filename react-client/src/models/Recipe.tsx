import { Ingredient } from "./Ingredient";
import { PageableResponse } from "./Pageable";

export type Unit = {
    name: string;
}

export type Category = {
    name: CategoryEnum;
}

export enum CategoryEnum {
    UTENSILS = "Accesorii",
    APPETIZERS = "Aperitive",
    DRINKS = "Bauturi",
    DESSERTS = "Deserturi",
    STEAKS = "Fripturi",
    SIDE_DISH = "Garnituri",
    HOT_FOOD = "Mancaruri calde",
    SALADS = "Salate",
    SOUP = "Super, Ciorbe",
}

export const CategoryIconClass: Record<CategoryEnum, string> = {
    [CategoryEnum.UTENSILS]: "img-utensils",
    [CategoryEnum.APPETIZERS]: "img-appetizers",
    [CategoryEnum.DRINKS]: "img-drinks",
    [CategoryEnum.DESSERTS]: "img-desserts",
    [CategoryEnum.STEAKS]: "img-steaks",
    [CategoryEnum.SIDE_DISH]: "img-side-dish",
    [CategoryEnum.HOT_FOOD]: "img-hot-food",
    [CategoryEnum.SALADS]: "img-salads",
    [CategoryEnum.SOUP]: "img-soup",
};

export function getCategoryIconClass(category: Category | null): string
{
    if (category)
        return CategoryIconClass[category.name];

    return "";
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

export type RecipeItem = {
    id: number;
	recipeId: number;
	ingredient: Ingredient;
	quantity: number;
}
