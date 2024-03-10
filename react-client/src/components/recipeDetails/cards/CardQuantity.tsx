import { ChangeEvent, useState } from "react";
import { Recipe, Unit } from "../../../models/Recipe";
import { updateRecipe } from "../../../controllers/RecipeController";
import PickUnitList from "../modals/PickUnitList";
import InputScrollBlocking from "../../InputScrollBlocking";
import Modal from "../../generic/Modal/Modal";

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
			<div className="card">
				<div className="card-icon">
					<div className="card-bg img-scale"></div>
				</div>
				<div className="card-details">
					<div className="card-title">Gramaj</div>
					<div className="card-text-big first-big hover-pointer" >
						<InputScrollBlocking
							name="quantity"
							type="number"
							value={quantity?.toString()}
							onChange={handleChange}
							onBlur={handleOnBlur}
						/>
						<span onClick={handleToggleModal}>{unit?.name}</span>
					</div>
				</div>
			</div>
			{
				isModalActive &&
				<Modal title="Alege unitatea de masura" toggleCallback={handleToggleModal}>
					<PickUnitList recipeId={recipeId} toggleModalCallback={handleToggleModal} />
				</Modal>
			}
		</>
	);
}