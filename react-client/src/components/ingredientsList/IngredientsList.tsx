import { Ingredient } from "../../models/Ingredient";
import * as Formatter from "../../utils/Formatting"
import TableList from "../generic/TableList/TableList";

type IngredientsListProps = {
	ingredients: Ingredient[] | null;
}

export default function IngredientsList(props: IngredientsListProps): JSX.Element
{
	return (
		<TableList header={[ "ID", "Nume", "Unitate", "Preț" ]}>
			{props.ingredients?.map((ingredient) => (
				<tr
					key={ingredient.id}
					onClick={() =>
					{
						window.location.href = document.location.pathname + "/" + ingredient.id
					}
					}>
					<td>{ingredient.id}</td>
					<td>{ingredient.name}</td>
					<td>{ingredient.unit.name}</td>
					<td>{Formatter.formatCurrency(ingredient.price)}</td>
				</tr>
			))}
		</TableList>
	);
}