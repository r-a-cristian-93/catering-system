import { addRecipe } from "../../controllers/RecipesController";
import { Recipe } from "../../models/Recipe";

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
			<button className="add-button" type="button" onClick={handleAddNewRecipe}>
				<div className="add-button-text">Adauga o reteta noua</div>
				<div className="add-button-dot">+</div>
			</button>
		</>
	);
}
