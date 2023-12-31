import { useQuery } from "react-query";
import { Recipe } from "../models/Recipe/Recipe";
import { getRecipes } from "../controllers/RecipeController";
import QueryStatus from "../utils/QueryStatus";

type AddItemModalProps =
{
    toogleModalCallback: () => void;
    orderId: number;
}

export function AddItemModal(props: AddItemModalProps): JSX.Element
{
    const {status, data: recipes} = useQuery<Recipe[]>({
        queryKey: ["recipes", props.orderId],
        queryFn: () => getRecipes()
    });

    if (status !== QueryStatus.SUCCESS)
        return <h1>Loading ...</h1>

    return (
		<div className="modal" id="edit-order-details-modal">
			<div className="modal-container">
				<div className="modal-box">
					<div className="modal-top">
						<h2 className="modal-title">Adauga articol</h2>
						<span className="modal-close no-print" onClick={props.toogleModalCallback}>×</span>
					</div>
					<div className="modal-content">
                        {recipes.map((recipe) => <div>{recipe.name}</div>)}
						<table className="full">
                            <thead>
							<tr>
								<th>ID</th>
								<th>Reteta</th>
								<th>Gramaj</th>
								<th>Cost unitar</th>
							</tr>
                            </thead>
                            <tbody>
							<tr id="2">
								<td>2</td>
								<td>Friganele</td>
								<td>100 g</td>
								<td>1.54 Lei</td>
							</tr>
							<tr id="5">
								<td>5</td>
								<td>Cartofi prajiti</td>
								<td>200 g</td>
								<td>1.02 Lei</td>
							</tr>
							<tr id="8">
								<td>8</td>
								<td>Mititei</td>
								<td>200 g</td>
								<td>7.04 Lei</td>
							</tr>
							<tr id="10">
								<td>10</td>
								<td>Orez cu lapte</td>
								<td>300 ml</td>
								<td>2.40 Lei</td>
							</tr>
							<tr id="12">
								<td>12</td>
								<td>Ciorba de perisoare</td>
								<td>300 ml</td>
								<td>0.00 Lei</td>
							</tr>
							<tr id="15">
								<td>15</td>
								<td>Ciorba de legume</td>
								<td>400 ml</td>
								<td>1.11 Lei</td>
							</tr>
							<tr id="16">
								<td>16</td>
								<td>Baclava</td>
								<td>23 g</td>
								<td>3.00 Lei</td>
							</tr>
							<tr id="27">
								<td>27</td>
								<td>Mamaliga</td>
								<td>1 kg</td>
								<td>0.07 Lei</td>
							</tr>
							<tr id="29">
								<td>29</td>
								<td>Friptura de vita</td>
								<td>300 g</td>
								<td>12.00 Lei</td>
							</tr>
                            </tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}