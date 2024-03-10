import { QueryClient, useQueryClient } from "react-query";
import { Unit, Recipe } from "../../../models/Recipe";
import { updateRecipe } from "../../../controllers/RecipeController";
import { QueryKeysRecipe } from "../../../QueryKeys/QueryKeysRecipe";

type PickUnitProps = {
	recipeId: number;
	unit: Unit;
	toogleModalCallback: () => void;
}

export default function PickUnit(props: PickUnitProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { recipeId, unit, toogleModalCallback } = props;

	function handleSelect(): void
	{
		const recipe: Recipe = {
			id: recipeId,
			unit: unit,
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
				<div className={"card-bg "}></div>
			</div>
			<div className="card-details-small">
				<div className="card-text-medium">{unit.name}</div>
			</div>
		</div>
	)
}