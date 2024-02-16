import { QueryClient, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import useScrollBlocking from "../../../hooks/UseScrollBlocking";
import { QueryKeysIngredient } from "../../../QueryKeys/QueryKeysIngredient";
import { Ingredient } from "../../../models/Ingredient";
import { getIngredientsAll } from "../../../controllers/IngredientsController";
import { RecipeItem } from "../../../models/Recipe";
import { QueryKeysRecipe } from "../../../QueryKeys/QueryKeysRecipe";
import AddRecipeItem from "./AddRecipeItem";

type AddRecipeItemModalProps = {
	toogleModalCallback: () => void;
	addSuccessfulCallback: (recipeItem: RecipeItem) => void;
	recipeId: number;
}

export default function AddRecipeItemModal(props: AddRecipeItemModalProps): JSX.Element
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

	useScrollBlocking();

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
		<div className="modal" id="edit-order-details-modal">
			<div className="modal-container">
				<div className="modal-box">
					<div className="modal-top">
						<h2 className="modal-title">Adauga ingredient</h2>
						<span className="modal-close no-print" onClick={props.toogleModalCallback}>×</span>
					</div>
					<div className="modal-content">
						<table id="add-item-table" className="full table-list">
							<thead>
								<tr>
									<th>ID</th>
									<th>Nume</th>
									<th>Cost unitar</th>
									<th>Cantitate</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								{
									ingredients?.map((ingredient) =>
										<AddRecipeItem
											key={ingredient.id}
											recipeId={props.recipeId}
											ingredient={ingredient}
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