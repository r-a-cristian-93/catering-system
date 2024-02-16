import { Recipe } from "../../models/Recipe";
import RecipeComponent from "./RecipeComponent";

type RecipesListPops = {
	recipes: Recipe[] | null;
};

export default function RecipesList(props: RecipesListPops): JSX.Element
{
	return (
		<table className="full">
			<thead>
				<tr>
					<th>ID</th>
					<th>Nume</th>
					<th>Categorie</th>
					<th>Cantitate</th>
					<th>Cost ingrediente</th>
				</tr>
			</thead>

			<tbody>
				{props.recipes?.map((recipe) => (
					<RecipeComponent key={recipe.id} recipe={recipe} />
				))}
			</tbody>
		</table>
	);
}
