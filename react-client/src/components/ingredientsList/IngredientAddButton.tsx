import { addIngredient } from "../../controllers/IngredientsController";
import AddButton from "../generic/AddButton/AddButton";

export default function IngredientAddButton(): JSX.Element
{
	function handleAddNewIngredient(): void
	{
		void addIngredient().then((newIngredient) =>
		{
			const path = "/ingrediente/" + newIngredient.id;

			window.location.pathname = path;
		});
	}

	return (
		<>
			<br />
			<AddButton text="Adaugă un ingredient nou" onClick={handleAddNewIngredient} />
		</>
	);
}
