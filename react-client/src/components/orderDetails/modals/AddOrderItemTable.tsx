import { QueryClient, useQuery, useQueryClient } from "react-query";
import { Recipe } from "../../../models/Recipe";
import { getRecipesAll } from "../../../controllers/RecipesController";
import AddOrderItem from "./AddOrderItem";
import { OrderItem } from "../../../models/Order";
import { useState } from "react";
import { QueryKeysRecipe } from "../../../QueryKeys/QueryKeysRecipe";
import { QueryKeysOrder } from "../../../QueryKeys/QueryKeysOrder";

type AddOrderItemTableProps = {
	addSuccessfulCallback: (orderItem: OrderItem) => void;
	orderId: number;
}

export default function AddOrderItemTable(props: AddOrderItemTableProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();
	const [ recipes, setRecipes ] = useState<Recipe[] | null>(getUnusedRecipes());

	useQuery<Recipe[]>({
		queryKey: QueryKeysRecipe.all,
		queryFn: () => getRecipesAll(),
		staleTime: 60 * 1000,
		onSuccess: () =>
		{
			setRecipes(getUnusedRecipes());
		}
	});

	function getUnusedRecipes(): Recipe[] | null
	{
		const excludeRecipesIds: number[] = (queryClient.getQueryData(QueryKeysOrder.itemsByOrderId(props.orderId)) as OrderItem[])
			.map((item) => item.recipe.id);

		const availableRecipes: Recipe[] | null | undefined = queryClient.getQueryData(QueryKeysRecipe.all);

		if (availableRecipes)
			return availableRecipes.filter((recipe) => !excludeRecipesIds.includes(recipe.id));

		return null;
	}

	function handleAddItemSuccessful(orderItem: OrderItem): void
	{
		void queryClient.invalidateQueries(QueryKeysOrder.itemsByOrderId(props.orderId));

		// we know that the item was added so we can safely do only optimistic update
		setRecipes((prev) => prev && prev.filter((recipe) => recipe.id != orderItem.recipe.id));

		// optimistic update
		props.addSuccessfulCallback(orderItem);
	}

	return (
		<table id="add-item-table" className="full table-list">
			<thead>
				<tr>
					<th>ID</th>
					<th>Rețetă</th>
					<th>Gramaj</th>
					<th>Cost unitar</th>
					<th>Porții</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				{
					recipes?.map((recipe) =>
						<AddOrderItem
							key={recipe.id}
							orderId={props.orderId}
							recipe={recipe}
							addSuccessfulCallback={handleAddItemSuccessful} />
					)
				}
			</tbody>
		</table>
	);
}