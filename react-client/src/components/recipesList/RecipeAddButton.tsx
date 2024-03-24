import { addRecipe } from "../../controllers/RecipesController";
import { Recipe } from "../../models/Recipe";
import AddButton from "../generic/AddButton/AddButton";

export default function RecipeAddButton(): JSX.Element
{
	function handleAddNewRecipe(): void
	{
		const recipe: Recipe = {} as Recipe;

		void addRecipe(recipe).then((newRecipe) =>
		{
			const path = "/retete/" + newRecipe.id;

			window.location.pathname = path;
		});
	}

	return (
		<>
			<br />
			<AddButton text="Adauga o reteta noua" onClick={handleAddNewRecipe} />
		</>
	);
}
