import { addRecipe } from "../../controllers/RecipesController";
import AddButton from "../generic/AddButton/AddButton";

export default function RecipeAddButton(): JSX.Element
{
	function handleAddNewRecipe(): void
	{
		void addRecipe().then((newRecipe) =>
		{
			const path = "/retete/" + newRecipe.id;

			window.location.pathname = path;
		});
	}

	return (
		<>
			<br />
			<AddButton text="Adaugă o rețetă nouă" onClick={handleAddNewRecipe} />
		</>
	);
}
