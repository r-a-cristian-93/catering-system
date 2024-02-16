import { RecipeItem } from "../models/Recipe";

const { VITE_API_URL } = import.meta.env;

export async function getRecipeItems(recipeId: number): Promise<RecipeItem[]>
{
    const url = VITE_API_URL + "/recipes/" + recipeId + "/details";

    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const recipeItemsPromise: Promise<RecipeItem[]> = response.json().then((json) =>
    {
        const recipeItems: RecipeItems = {} as RecipeItems;

        Object.assign(recipeItems, json);

        return Object.values(recipeItems).flatMap((each) => each);
    });

    return recipeItemsPromise;
}

export async function updateRecipeItem(recipeItem: RecipeItem): Promise<RecipeItem>
{
    const url: string = VITE_API_URL + "/recipes/" + recipeItem.recipeId + "/details";

    const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeItem),
    });

    const recipeItemPromise: Promise<RecipeItem> = response.json().then((json) =>
    {
        const recipeItem: RecipeItem = {} as RecipeItem;

        Object.assign(recipeItem, json);

        return recipeItem;
    });

    return recipeItemPromise;
}

export async function deleteRecipeItem(recipeItem: RecipeItem): Promise<boolean>
{
    const url: string = VITE_API_URL + "/recipes/" + recipeItem.recipeId + "/details";

    const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeItem),
    });

    return response.ok;
}

export async function addRecipeItem(recipeItem: RecipeItem): Promise<RecipeItem>
{
    const url: string = VITE_API_URL + "/recipes/" + recipeItem.recipeId + "/details";

    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeItem),
    });

    return response.json().then((json) =>
    {
        const item: RecipeItem = {} as RecipeItem;

        Object.assign(item, json);

        return item;
    });
}

type RecipeItems = {
    items: RecipeItem[];
};
