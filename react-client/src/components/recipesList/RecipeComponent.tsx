import { Recipe } from "../../models/Recipe";
import * as Formatter from "../../utils/Formatting";

type RecipeComponentProps = {
	recipe: Recipe;
};

export default function RecipeComponent(props: RecipeComponentProps): JSX.Element
{
	const recipe = props.recipe;

	return (
		<tr
			onClick={() =>
			{
				window.location.href = document.location.pathname + "/" + recipe.id
			}
			}>
			<td>{recipe.id}</td>
			<td>{recipe.name}</td>
			<td>{recipe.category.name}</td>
			<td>{recipe.quantity + " " + recipe.unit.name}</td>
			<td>{Formatter.formatCurrency(recipe.ingCost)}</td>
		</tr>
	);
}
