import { useQuery } from "react-query";
import { Recipe } from "../../../models/Recipe";
import { getRecipesAll } from "../../../controllers/RecipesController";
import AddOrderItem from "./AddOrderItem";
import { useState } from "react";
import { QueryKeysRecipe } from "../../../QueryKeys/QueryKeysRecipe";
import TableList from "../../generic/TableList/TableList";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";

export default function AddOrderItemTable(): JSX.Element
{
	const { orderItems: excludeRecipes } = useOrderDetailsContext();
	const [ availableRecipes, setAvailableRecipes ] = useState<Recipe[] | null>(null);

	const recipes = getUnusedRecipes();

	useQuery<Recipe[]>({
		queryKey: QueryKeysRecipe.all,
		queryFn: () => getRecipesAll(),
		staleTime: 60 * 1000,
		onSuccess: setAvailableRecipes
	});

	function getUnusedRecipes(): Recipe[] | null
	{
		if (excludeRecipes && availableRecipes)
		{
			const excludeRecipesIds: number[] = excludeRecipes?.map((item) => item.recipe.id);

			return availableRecipes.filter((recipe) => !excludeRecipesIds.includes(recipe.id));
		}

		return null;
	}

	return (
		<TableList className="add-item-table" header={[ "ID", "Rețetă", "Gramaj", "Cost unitar", "Porții", "Total" ]}>
			{
				recipes?.map((recipe) =>
					<AddOrderItem key={recipe.id} recipe={recipe} />
				)
			}
		</TableList>
	);
}
