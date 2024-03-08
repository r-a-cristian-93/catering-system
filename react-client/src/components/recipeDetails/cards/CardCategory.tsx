import { useState } from "react";
import { Category, getCategoryIconClass } from "../../../models/Recipe";
import PickCategoryList from "../modals/PickCategoryList";
import Modal from "../../generic/Modal";

type CardClientProps = {
	recipeId: number;
	category: Category | null;
}

export default function CardCategory(props: CardClientProps): JSX.Element
{
	const { recipeId, category } = props;

	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function handleToggleModal(): void
	{
		setModalActive(prev => !prev);
	}

	return (
		<>
		<div className="card hover-pointer">
			<div className="card-icon">
				<div className={"card-bg " + getCategoryIconClass(category)}></div>
			</div>
			<div className="card-details" onClick={handleToggleModal}>
				<div className="card-title">Categorie</div>
				<div className="card-text-big first-big">
					{category?.name}
				</div>
			</div>
		</div>
		{
			isModalActive &&
			<Modal title="Alege categoria" toggleCallback={handleToggleModal}>
				<PickCategoryList recipeId={recipeId} toggleModalCallback={handleToggleModal}/>
			</Modal>
		}
		</>
	);
}