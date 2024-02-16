import { useState } from "react";
import * as Formatter from "../../../utils/Formatting"

type CardClientProps = {
	recipeId: number;
	cost: number | null;
}

export default function CardCost(props: CardClientProps): JSX.Element
{
	const { recipeId, cost, unit } = props;

	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function handleToogleModal(): void
	{
		setModalActive(prev => !prev);
	}

	return (
		<>
		<div className="card hover-pointer">
			<div className="card-icon">
				<div className="card-bg img-money"></div>
			</div>
			<div className="card-details" onClick={handleToogleModal}>
				<div className="card-title">Cost ingrediente</div>
				<div className="card-text-big first-big">
					{Formatter.formatCurrency(cost)}
				</div>
			</div>
		</div>
		{
			// isModalActive && <PickCategoryModal recipeId={recipeId} toogleModalCallback={handleToogleModal}/>
		}
		</>
	);
}