import { Ingredient } from "../../models/Ingredient";
import * as Formatter from "../../utils/Formatting"

type IngredientsListProps = {
	ingredients: Ingredient[] | null;
}

export default function IngredientsList(props: IngredientsListProps): JSX.Element
{
	return (
		<table className="table-list">
			<thead>
				<tr>
					<th>ID</th>
					<th>Nume</th>
					<th>Unitate</th>
					<th>Pret</th>
				</tr>
			</thead>

			<tbody>
				{props.ingredients?.map((ingredient) => (
					<tr
						key={ingredient.id}
						id={ingredient.id.toString()}
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
			</tbody>
		</table>
	);
}