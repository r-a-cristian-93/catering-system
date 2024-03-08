import { RecipeItem } from "../models/Recipe";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export async function getRecipeItems(recipeId: number): Promise<RecipeItem[]>
{
    const url = VITE_API_URL + "/recipes/" + recipeId + "/details";

    const response = await axios.get<RecipeItem[]>(url, { withCredentials: true });

    return response.data;
}

export async function updateRecipeItem(recipeItem: RecipeItem): Promise<RecipeItem>
{
    const url: string = VITE_API_URL + "/recipes/" + recipeItem.recipeId + "/details";

    const response = await axios.put<RecipeItem>(url, recipeItem, { withCredentials: true });

    return response.data;
}

export async function deleteRecipeItem(recipeItem: RecipeItem): Promise<boolean>
{
    const url: string = VITE_API_URL + "/recipes/details";

    const response = await axios.delete<boolean>(url, {
         withCredentials: true,
        params: { detailsId: recipeItem.id }
    });

    return response.data;
}

export async function addRecipeItem(recipeItem: RecipeItem): Promise<RecipeItem>
{
    const url: string = VITE_API_URL + "/recipes/" + recipeItem.recipeId + "/details";

    const response = await axios.post<RecipeItem>(url, recipeItem, { withCredentials: true });

    return response.data;
}
