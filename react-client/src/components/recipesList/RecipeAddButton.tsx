import { addRecipe } from "../../controllers/RecipesController";
import { Recipe } from "../../models/Recipe";

export default function RecipeAddButton(): JSX.Element
{
	function handleAddNewRecipe(): void
	{
		const recipe: Recipe = {} as Recipe;

		void addRecipe(recipe).then((newRecipe) =>
		{
			const path = "/retete/detalii_reteta/" + newRecipe.id;

			window.location.pathname = path;
		});
	}

	return (
		<>
			<br />
			<button className="button" type="button" onClick={handleAddNewRecipe}>
				+ Adauga o reteta noua
			</button>
		</>
	);
}