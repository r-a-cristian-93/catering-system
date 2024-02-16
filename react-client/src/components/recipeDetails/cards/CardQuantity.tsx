import { useState } from "react";
import { Unit } from "../../../models/Recipe";

type CardClientProps = {
	recipeId: number;
	quantity: number | null;
	unit: Unit | null;
}

export default function CardQuantity(props: CardClientProps): JSX.Element
{
	const { recipeId, quantity, unit } = props;

	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function handleToogleModal(): void
	{
		setModalActive(prev => !prev);
	}

	return (
		<>
		<div className="card hover-pointer">
			<div className="card-icon">
				<div className="card-bg profil"></div>
			</div>
			<div className="card-details" onClick={handleToogleModal}>
				<div className="card-title">Gramaj</div>
				<div className="card-text-big first-big">
					{quantity} {unit?.name}
				</div>
			</div>
		</div>
		{
			// isModalActive && <PickCategoryModal recipeId={recipeId} toogleModalCallback={handleToogleModal}/>
		}
		</>
	);
}