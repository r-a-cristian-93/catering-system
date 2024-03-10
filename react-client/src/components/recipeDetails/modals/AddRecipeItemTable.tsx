import { QueryClient, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { QueryKeysIngredient } from "../../../QueryKeys/QueryKeysIngredient";
import { Ingredient } from "../../../models/Ingredient";
import { getIngredientsAll } from "../../../controllers/IngredientsController";
import { RecipeItem } from "../../../models/Recipe";
import { QueryKeysRecipe } from "../../../QueryKeys/QueryKeysRecipe";
import AddRecipeItem from "./AddRecipeItem";
import TableList from "../../generic/TableList/TableList";

type AddRecipeItemTableProps = {
	addSuccessfulCallback: (recipeItem: RecipeItem) => void;
	recipeId: number;
}

export function AddRecipeItemTable(props: AddRecipeItemTableProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();
	const [ ingredients, setIngredients ] = useState<Ingredient[] | null>(getUnusedIngredients());

	useQuery<Ingredient[]>({
		queryKey: QueryKeysIngredient.all,
		queryFn: () => getIngredientsAll(),
		staleTime: 60 * 1000,
		onSuccess: (date) =>
		{
			console.log(date);
			setIngredients(getUnusedIngredients());
		}
	});

	function getUnusedIngredients(): Ingredient[] | null
	{
		const excludeIngredientsIds: number[] = (queryClient.getQueryData(QueryKeysRecipe.itemsByRecipeId(props.recipeId)) as RecipeItem[])
			.map((item) => item.ingredient.id);

		const availableIngredients: Ingredient[] | null | undefined = queryClient.getQueryData(QueryKeysIngredient.all);

		if (availableIngredients)
			return availableIngredients.filter((ingredient) => !excludeIngredientsIds.includes(ingredient.id));

		return null;
	}

	function handleAddItemSuccessful(recipeItem: RecipeItem): void
	{
		void queryClient.invalidateQueries(QueryKeysRecipe.itemsByRecipeId(props.recipeId));

		// we know that the item was added so we can safely do only optimistic update
		setIngredients((prev) => prev && prev.filter((ingredient) => ingredient.id != recipeItem.ingredient.id));

		// optimistic update
		props.addSuccessfulCallback(recipeItem);
	}

	return (
		<TableList className="add-item-table" header={[ "ID", "Nume", "Cost unitar", "Cantitate", "Total" ]}>
			{
				ingredients?.map((ingredient) =>
					<AddRecipeItem
						key={ingredient.id}
						recipeId={props.recipeId}
						ingredient={ingredient}
						addSuccessfulCallback={handleAddItemSuccessful} />
				)
			}
		</TableList>
	)
}