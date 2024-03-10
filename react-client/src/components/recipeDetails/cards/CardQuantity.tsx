import { ChangeEvent, useState } from "react";
import { Recipe, Unit } from "../../../models/Recipe";
import { updateRecipe } from "../../../controllers/RecipeController";
import PickUnitList from "../modals/PickUnitList";
import InputScrollBlocking from "../../generic/InputScrollBlocking";
import Modal from "../../generic/Modal/Modal";
import Card from "../../generic/Card/Card";
import CardIcon from "../../generic/Card/CardIcon";
import CardDetails from "../../generic/Card/CardDetails";

type CardClientProps = {
	recipeId: number;
	quantity: number | null;
	unit: Unit | null;
}

export default function CardQuantity(props: CardClientProps): JSX.Element
{
	const { recipeId, unit } = props;

	const [ quantity, setQuantity ] = useState<number | null>(props.quantity);

	function handleChange(event: ChangeEvent<HTMLInputElement>): void
	{
		const { name, value } = event.target;

		if (name === "quantity")
			(Number(value) >= 0) && setQuantity(Number(value));
	}

	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function handleToggleModal(): void
	{
		setModalActive(prev => !prev);
	}

	function handleOnBlur(): void
	{
		void updateRecipe(
			{
				id: recipeId,
				quantity: quantity
			} as Recipe
		);
	}

	return (
		<>
			<Card>
				<CardIcon>
					<div className="card-bg img-scale"></div>
				</CardIcon>
				<CardDetails>
					<div className="card-title">Gramaj</div>
					<div className="card-text-big hover-pointer" >
						<InputScrollBlocking
							name="quantity"
							type="number"
							size={5}
							value={quantity?.toString()}
							onChange={handleChange}
							onBlur={handleOnBlur}
						/>
						<span onClick={handleToggleModal}>{unit?.name}</span>
					</div>
				</CardDetails>
			</Card>
			{
				isModalActive &&
				<Modal title="Alege unitatea de masura" toggleCallback={handleToggleModal}>
					<PickUnitList recipeId={recipeId} toggleModalCallback={handleToggleModal} />
				</Modal>
			}
		</>
	);
}