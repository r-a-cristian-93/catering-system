import { useParams } from "react-router-dom";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { QueryKeysOrder } from "../QueryKeys/QueryKeysOrder";
import { getRecipe } from "../controllers/RecipeController";
import { Recipe } from "../models/Recipe";
import { QueryKeysRecipe } from "../QueryKeys/QueryKeysRecipe";
import CardListRecipe from "../components/orderDetails/cards/CardListRecipe";

export default function RecipeDetailsPage(): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const recipeId: number = Number(useParams().recipeId);

	useQuery<Recipe>({
		queryKey: QueryKeysRecipe.recipeById(recipeId),
		queryFn: () => getRecipe(recipeId),
		onSuccess: (recipe) =>
		{
			console.log(recipe);
			setRecipe(recipe);
		}
	});

	const [ recipe, setRecipe ] = useState<Recipe | null>(
		queryClient.getQueryData(QueryKeysOrder.orderById(recipeId)) as Recipe | null
	);

	return (
		<div className="box">
			<div className="box-content" id="order-details">
				<div className="order-details-title">#{recipe?.id}, {recipe?.name}</div>
				{recipe && <CardListRecipe recipe={recipe}/> }
			</div>
		</div>
	);
}
