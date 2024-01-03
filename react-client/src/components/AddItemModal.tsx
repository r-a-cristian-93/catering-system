import { QueryClient, useQuery, useQueryClient } from "react-query";
import { Recipe } from "../models/Recipe/Recipe";
import { getRecipes } from "../controllers/RecipeController";
import AddItem from "./AddItem";
import { OrderItem } from "../controllers/OrderItemsController";
import { useState } from "react";

type AddItemModalProps = {
	toogleModalCallback: () => void;
	addSuccessfulCallback: (orderItem: OrderItem) => void;
	orderId: number;
}

export default function AddItemModal(props: AddItemModalProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	useQuery<Recipe[]>({
		queryKey: [ "recipes", Number(props.orderId) ],
		queryFn: () => getRecipes(),
		staleTime: 60 * 1000,
		onSuccess: (recipes) =>
		{
			const excludeRecipesIds = (queryClient.getQueryData([ "orderItems", Number(props.orderId) ]) as OrderItem[])
				.map((item) => item.recipe.id);

			setRecipes(recipes.filter((recipe) => !excludeRecipesIds.includes(recipe.id)));
			setRecipes(recipes);
		}
	});

	const [ recipes, setRecipes ] = useState<Recipe[] | null>(() =>
	{
		const availableQuery: Recipe[] = queryClient.getQueryData([ "recipes", props.orderId ]) as Recipe[];

		return availableQuery;
	})

	function handleAddItemSuccessful(orderItem: OrderItem): void
	{
		void queryClient.invalidateQueries([ "orderItems", Number(props.orderId) ]);

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
						<table className="full">
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