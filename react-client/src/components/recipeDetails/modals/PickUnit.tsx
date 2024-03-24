import { QueryClient, useQueryClient } from "react-query";
import { Unit, Recipe } from "../../../models/Recipe";
import { updateRecipe } from "../../../controllers/RecipeController";
import { QueryKeysRecipe } from "../../../QueryKeys/QueryKeysRecipe";
import CardSmall from "../../generic/Card/CardSmall";
import CardIconSmall from "../../generic/Card/CardIconSmall";
import CardDetails from "../../generic/Card/CardDetails";

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
		<CardSmall onClick={handleSelect}>
			<CardIconSmall>
				<div className={"card-bg "}></div>
			</CardIconSmall>
			<CardDetails>
				<div className="card-text-medium">{unit.name}</div>
			</CardDetails>
		</CardSmall>
	)
}