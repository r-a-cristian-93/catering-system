import { Ingredient } from "../../../models/Ingredient";
import CardPrice from "./CardPrice";
import CardPriceTrend from "./CardPriceTrend";

type CardListIngredientProps = {
	ingredient: Ingredient;
};

export default function CardListIngredient(props: CardListIngredientProps): JSX.Element
{
	const ingredient: Ingredient = props.ingredient;

	return <div className="cards">
		<CardPrice price={ingredient.price} />
		<CardPriceTrend ingredientId={ingredient.id} />
	</div>;
}