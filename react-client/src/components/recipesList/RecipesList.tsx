import { Recipe } from "../../models/Recipe";
import TableList from "../generic/TableList/TableList";
import RecipeComponent from "./RecipeComponent";

type RecipesListPops = {
	recipes: Recipe[] | null;
};

export default function RecipesList(props: RecipesListPops): JSX.Element
{
	return (
		<TableList header={[ "ID", "Nume", "Categorie", "Cantitate", "Cost Ingrediente" ]}>
			{props.recipes?.map((recipe) => (
				<RecipeComponent key={recipe.id} recipe={recipe} />
			))}
		</TableList>
	);
}
