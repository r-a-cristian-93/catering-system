import { Recipe } from "../../../models/Recipe";
import CardCategory from "./CardCategory";

type CardListRecipeProps = {
	recipe: Recipe;
};

export default function CardListRecipe(props: CardListRecipeProps): JSX.Element
{
	const {
		id: recipeId,
		name,
		quantity,
		unit,
		category,
		ingCost,
	} = props.recipe;

	return <div className="cards">
		<CardCategory recipeId={recipeId} category={category} />
		<CardCategory recipeId={recipeId} category={category} />
		<CardCategory recipeId={recipeId} category={category} />
	</div>;
}