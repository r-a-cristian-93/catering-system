import { IngredientPriceHistory } from "../../models/Ingredient"
import * as Formatter from "../../utils/Formatting"

type IngredientPriceHistoryRecordProps = {
    priceHistoryRecord: IngredientPriceHistory
}


export default function IngredientPriceHistoryRecord(props: IngredientPriceHistoryRecordProps): JSX.Element
{
    const priceHistoryRecord: IngredientPriceHistory = props.priceHistoryRecord;

    return <>
        <tr>
            <td>{priceHistoryRecord.id}</td>
            <td>{Formatter.formatDateString(priceHistoryRecord.date)}</td>
            <td>{Formatter.formatCurrency(priceHistoryRecord.price)}</td>
        </tr>
    </>
}