import { useParams } from "react-router-dom";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { ChangeEvent, useState } from "react";
import { QueryKeysOrder } from "../QueryKeys/QueryKeysOrder";
import { getRecipe, updateRecipe } from "../controllers/RecipeController";
import { Recipe } from "../models/Recipe";
import { QueryKeysRecipe } from "../QueryKeys/QueryKeysRecipe";
import CardListRecipe from "../components/recipeDetails/cards/CardListRecipe";
import RecipeItems from "../components/recipeDetails/RecipeItems";
import SimplePage from "../components/generic/SimplePage/SimplePage";

export default function RecipeDetailsPage(): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const recipeId: number = Number(useParams().recipeId);

	useQuery<Recipe>({
		queryKey: QueryKeysRecipe.recipeById(recipeId),
		queryFn: () => getRecipe(recipeId),
		onSuccess: (recipe) =>
		{
			setRecipe(recipe);
		}
	});

	const [ recipe, setRecipe ] = useState<Recipe | null>(
		queryClient.getQueryData(QueryKeysOrder.orderById(recipeId)) as Recipe | null
	);

	function handleChange(event: ChangeEvent<HTMLInputElement>): void
	{
		const { name, value } = event.target;

		if (name === "name")
		{
			setRecipe((prev) =>
			{
				if (!prev)
					return prev;
				else
					return {
						...prev,
						[ name ]: value,
					};
			});
		}
	}

	function handleOnBlur(): void
	{
		if (recipe)
			void updateRecipe(recipe);
	}

	return (
		<SimplePage
			title={recipe?.name || ""}
			editableTitle={{ onChange: handleChange, onBlur: handleOnBlur }}
			imagePath="/img/recipes.png"
		>
			{recipe && <CardListRecipe recipe={recipe} />}
			<RecipeItems recipeId={recipeId} />
		</SimplePage>
	);
}
