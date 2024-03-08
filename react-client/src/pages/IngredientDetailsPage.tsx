import { QueryClient, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom"
import { Ingredient, IngredientPriceHistory } from "../models/Ingredient";
import { ChangeEvent, useState } from "react";
import { getIngredient, getPriceHistory, updateIngredient } from "../controllers/IngredientController";
import { QueryKeysIngredient } from "../QueryKeys/QueryKeysIngredient";
import CardListIngredient from "../components/ingredientDetails/cards/CardListIngredient";
import IngredientPriceHistoryComponent from "../components/ingredientDetails/IngredientPriceHistoryComponent";
import Breadcrumbs from "../components/Breadcrumbs";
import AddButton from "../components/generic/AddButton";
import RecordNewPrice from "../components/ingredientDetails/modals/RecordNewPrice";
import Modal from "../components/generic/Modal";

export default function IngredientDetailsPage(): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const ingredientId: number = Number(useParams().ingredientId);

	useQuery<Ingredient>({
		queryKey: QueryKeysIngredient.ingredientById(ingredientId),
		queryFn: () => getIngredient(ingredientId),
		onSuccess: (ingredient) =>
		{
			setIngredient(ingredient);
		}
	})

	useQuery<IngredientPriceHistory[]>({
		queryKey: QueryKeysIngredient.priceHistoryByIngredientId(ingredientId),
		queryFn: () => getPriceHistory(ingredientId),
		onSuccess: ((priceHistory) =>
		{
			setPriceHistory(priceHistory);
		})
	})

	const [ ingredient, setIngredient ] = useState<Ingredient | null>(
		queryClient.getQueryData(QueryKeysIngredient.ingredientById(ingredientId)) as Ingredient | null
	)

	const [ priceHistory, setPriceHistory ] = useState<IngredientPriceHistory[] | null>(
		queryClient.getQueryData(QueryKeysIngredient.priceHistoryByIngredientId(ingredientId)) as IngredientPriceHistory[]
	);

	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function toggleModalCallback(): void
	{
		setModalActive((prev) => !prev);
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>): void
	{
		const { name, value } = event.target;

		if (name === "name")
		{
			setIngredient((prev) =>
			{
				if (!prev)
					return prev;
				else
					return {
						...prev,
						[ name ]: value,
					};
			});
		}
	}

	function handleOnBlur(): void
	{
		if (ingredient)
			void updateIngredient(ingredient);
	}

	return <>
		<div className="box">
			<div className="box-header">
				<Breadcrumbs />
				<img height="100px" src="../img/ingredients.png" />
				<h1 className="box-title">
					<input
						name="name"
						value={ingredient?.name || ""}
						autoComplete="Nume ingredient"
						onChange={handleChange}
						onBlur={handleOnBlur} />
				</h1>
			</div>
			<div className="box-content" id="order-details">
				{ingredient && <CardListIngredient ingredient={ingredient} />}

				<IngredientPriceHistoryComponent priceHistory={priceHistory} />

				<br />

				<AddButton text="Înregistrează preț nou" onClick={toggleModalCallback} />

				{
					isModalActive && <Modal title="Inregistrare pret nou" toggleCallback={toggleModalCallback}>
						<RecordNewPrice ingredientId={ingredientId} toggleModalCallback={toggleModalCallback} />
					</Modal>
				}

			</div>
		</div>
	</>
}