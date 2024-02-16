import { useState } from "react";
import { Category, getCategoryIconClass } from "../../../models/Recipe";
import PickCategoryModal from "../modals/PickCategoryModal";

type CardClientProps = {
	recipeId: number;
	category: Category | null;
}

export default function CardCategory(props: CardClientProps): JSX.Element
{
	const { recipeId, category } = props;

	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function handleToogleModal(): void
	{
		setModalActive(prev => !prev);
	}

	return (
		<>
		<div className="card hover-pointer">
			<div className="card-icon">
				<div className={"card-bg " + getCategoryIconClass(category)}></div>
			</div>
			<div className="card-details" onClick={handleToogleModal}>
				<div className="card-title">Categorie</div>
				<div className="card-text-big first-big">
					{category?.name}
				</div>
			</div>
		</div>
		{
			isModalActive && <PickCategoryModal recipeId={recipeId} toogleModalCallback={handleToogleModal}/>
		}
		</>
	);
}