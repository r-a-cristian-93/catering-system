import { QueryClient, useQuery, useQueryClient } from "react-query";
import { Recipe } from "../models/Recipe/Recipe";
import { getRecipes } from "../controllers/RecipeController";
import AddItem from "./AddItem";
import { OrderItem } from "../controllers/OrderItemsController";
import { useState } from "react";
import useScrollBlocking from "../hooks/UseScrollBlocking";
import { QueryKeysRecipe } from "../QueryKeys/QueryKeysRecipe";
import { QueryKeysOrder } from "../QueryKeys/QueryKeysOrder";

type AddItemModalProps = {
	toogleModalCallback: () => void;
	addSuccessfulCallback: (orderItem: OrderItem) => void;
	orderId: number;
}

export default function AddItemModal(props: AddItemModalProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();
	const [ recipes, setRecipes ] = useState<Recipe[] | null>(getUnusedRecipes());

	useQuery<Recipe[]>({
		queryKey: QueryKeysRecipe.all,
		queryFn: () => getRecipes(),
		staleTime: 60 * 1000,
		onSuccess: () =>
		{
			setRecipes(getUnusedRecipes());
		}
	});

	useScrollBlocking();

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
		<div className="modal" id="edit-order-details-modal">
			<div className="modal-container">
				<div className="modal-box">
					<div className="modal-top">
						<h2 className="modal-title">Adauga articol</h2>
						<span className="modal-close no-print" onClick={props.toogleModalCallback}>×</span>
					</div>
					<div className="modal-content">
						<table id="add-item-table" className="full table-list">
							<thead>
								<tr>
									<th>ID</th>
									<th>Reteta</th>
									<th>Gramaj</th>
									<th>Cost unitar</th>
									<th>Portii</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								{
									recipes?.map((recipe) =>
										<AddItem
											key={recipe.id}
											orderId={props.orderId}
											recipe={recipe}
											addSuccessfulCallback={handleAddItemSuccessful} />
									)
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}