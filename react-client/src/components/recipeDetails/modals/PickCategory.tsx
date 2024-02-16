import { QueryClient, useQueryClient } from "react-query";
import { Category, Recipe, getCategoryIconClass } from "../../../models/Recipe";
import { updateRecipe } from "../../../controllers/RecipeController";
import { QueryKeysRecipe } from "../../../QueryKeys/QueryKeysRecipe";

type PickCategoryProps = {
	recipeId: number;
	category: Category;
	toogleModalCallback: () => void;
}

export default function PickCategory(props: PickCategoryProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { recipeId: recipeId, category: category, toogleModalCallback } = props;

	function handleSelect(): void
	{
		const recipe: Recipe = {
			id: recipeId,
			category: category,
		} as Recipe;

		void updateRecipe(recipe).then((recipe) =>
		{
			void queryClient.invalidateQueries(QueryKeysRecipe.recipeById(recipe.id));

			toogleModalCallback();
		});
	}

	return (
		<div className="card-small hover-pointer" onClick={handleSelect}>
			<div className="card-icon-small">
				<div className={"card-bg " + getCategoryIconClass(category)}></div>
			</div>
			<div className="card-details-small">
				<div className="card-text-medium first-big">{category.name}</div>
			</div>
		</div>
	)
}