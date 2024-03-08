import { useParams } from "react-router-dom";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { ChangeEvent, useState } from "react";
import { QueryKeysOrder } from "../QueryKeys/QueryKeysOrder";
import { getRecipe, updateRecipe } from "../controllers/RecipeController";
import { Recipe } from "../models/Recipe";
import { QueryKeysRecipe } from "../QueryKeys/QueryKeysRecipe";
import CardListRecipe from "../components/recipeDetails/cards/CardListRecipe";
import RecipeItems from "../components/recipeDetails/RecipeItems";
import Breadcrumbs from "../components/Breadcrumbs";

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
		<div className="box">
			<div className="box-header">
				<Breadcrumbs />
				<img height="100px" src="../img/recipes.png" />
				<h1 className="box-title">
					<input
						name="name"
						value={recipe?.name || ""}
						autoComplete="Nume rețetă"
						onChange={handleChange}
						onBlur={handleOnBlur}/>
				</h1>
			</div>
			<div className="box-content" id="order-details">
				{recipe && <CardListRecipe recipe={recipe}/> }
				<RecipeItems recipeId={recipeId} />
			</div>
		</div>
	);
}
