import { useState } from "react";
import { Category, getCategoryIconClass } from "../../../models/Recipe";
import PickCategoryList from "../modals/PickCategoryList";
import Modal from "../../generic/Modal/Modal";
import Card from "../../generic/Card/Card";
import CardIcon from "../../generic/Card/CardIcon";
import CardDetails from "../../generic/Card/CardDetails";

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
			<Card className="hover-pointer" onClick={handleToggleModal}>
				<CardIcon>
					<div className={"card-bg " + getCategoryIconClass(category)}></div>
				</CardIcon>
				<CardDetails>
					<div className="card-title">Categorie</div>
					<div className="card-text-big">
						{category?.name}
					</div>
				</CardDetails>
			</Card>
			{
				isModalActive &&
				<Modal title="Alege categoria" toggleCallback={handleToggleModal}>
					<PickCategoryList recipeId={recipeId} toggleModalCallback={handleToggleModal} />
				</Modal>
			}
		</>
	);
}