import { IngredientPriceHistory } from "../../models/Ingredient";
import IngredientPriceHistoryRecord from "./IngredientPriceHistoryRecord";

type IngredientPriceHistoryProps = {
	priceHistory: IngredientPriceHistory[] | null;
};

export default function IngredientPriceHistoryComponent(props: IngredientPriceHistoryProps): JSX.Element
{
	return (
		<>
            <table className="full table-list">
				<thead>
                    <tr className="font-size-120">
						<th>ID</th>
						<th>Data inregistrare</th>
						<th>Pret</th>
					</tr>
				</thead>
				<tbody>
					{props.priceHistory?.map((record) => (
						<IngredientPriceHistoryRecord priceHistoryRecord={record} />
					))}
				</tbody>
			</table>
		</>
	);
}
