import { Recipe } from "../../../models/Recipe";
import CardCategory from "./CardCategory";
import CardCost from "./CardCost";
import CardQuantity from "./CardQuantity";

type CardListRecipeProps = {
	recipe: Recipe;
};

export default function CardListRecipe(props: CardListRecipeProps): JSX.Element
{
	const {
		id: recipeId,
		quantity,
		unit,
		category,
		ingCost,
	} = props.recipe;

	return <div className="cards">
		<CardCategory recipeId={recipeId} category={category} />
		<CardQuantity recipeId={recipeId} quantity={quantity} unit={unit} />
		<CardCost cost={ingCost} />
	</div>;
}