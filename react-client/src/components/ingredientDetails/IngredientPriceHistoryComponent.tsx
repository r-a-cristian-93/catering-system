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
			<TableList header={[ "ID", "Dată înregistrare", "Preț" ]}>
				{props.priceHistory?.map((record) => (
					<IngredientPriceHistoryRecord key={record.id} priceHistoryRecord={record} />
				))}
			</TableList>
		</>
	);
}
