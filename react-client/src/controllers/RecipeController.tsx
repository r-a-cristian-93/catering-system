import { Recipe } from "../models/Recipe";

const { VITE_API_URL } = import.meta.env;

export async function getRecipes(): Promise<Recipe[]>
{
    const url = VITE_API_URL + "/recipes";

    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const recipesPromise: Promise<Recipe[]> = response.json().then((json) =>
    {
        const recipes: RecipesList = {} as RecipesList;

        Object.assign(recipes, json);

        return Object.values(recipes).flatMap((each) => each);

    })

    return recipesPromise;
}

type RecipesList = {
    recipes: Recipe[];
}