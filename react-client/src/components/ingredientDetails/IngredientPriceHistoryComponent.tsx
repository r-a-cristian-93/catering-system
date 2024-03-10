import { IngredientPriceHistory } from "../../models/Ingredient";
import TableList from "../generic/TableList/TableList";
import IngredientPriceHistoryRecord from "./IngredientPriceHistoryRecord";

type IngredientPriceHistoryProps = {
	priceHistory: IngredientPriceHistory[] | null;
};

export default function IngredientPriceHistoryComponent(props: IngredientPriceHistoryProps): JSX.Element
{
	return (
		<>
			<TableList>
				<thead>
					<tr className="font-size-120">
						<th>ID</th>
						<th>Data inregistrare</th>
						<th>Pret</th>
					</tr>
				</thead>
				<tbody>
					{props.priceHistory?.map((record) => (
						<IngredientPriceHistoryRecord key={record.id} priceHistoryRecord={record} />
					))}
				</tbody>
			</TableList>
		</>
	);
}
