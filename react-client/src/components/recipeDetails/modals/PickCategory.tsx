import { QueryClient, useQueryClient } from "react-query";
import { Category, Recipe, getCategoryIconClass } from "../../../models/Recipe";
import { updateRecipe } from "../../../controllers/RecipeController";
import { QueryKeysRecipe } from "../../../QueryKeys/QueryKeysRecipe";
import CardSmall from "../../generic/Card/CardSmall";
import CardIconSmall from "../../generic/Card/CardIconSmall";
import CardDetails from "../../generic/Card/CardDetails";

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
		<CardSmall onClick={handleSelect}>
			<CardIconSmall>
				<div className={"card-bg " + getCategoryIconClass(category)}></div>
			</CardIconSmall>
			<CardDetails>
				<div className="card-text-medium">{category.name}</div>
			</CardDetails>
		</CardSmall>
	)
}