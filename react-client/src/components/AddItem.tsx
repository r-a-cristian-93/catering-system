import { Recipe } from "../models/Recipe/Recipe";
import * as Formatter from "../utils/Formatting";

type AddItemProps = {
    recipe: Recipe;
};

export default function AddItem(props: AddItemProps): JSX.Element
{
    return (
        <tr id="2">
            <td>{props.recipe.id}</td>
            <td>{props.recipe.name}</td>
            <td>{props.recipe.quantity + " " + props.recipe.unit.name}</td>
            <td>{Formatter.formatCurrency(props.recipe.ingCost)}</td>
        </tr>
    );
}
