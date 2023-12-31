import { useQuery } from "react-query";
import { Recipe } from "../models/Recipe/Recipe";
import { getRecipes } from "../controllers/RecipeController";
import QueryStatus from "../utils/QueryStatus";
import AddItem from "./AddItem";

type AddItemModalProps = {
    toogleModalCallback: () => void;
    orderId: number;
}

export default function AddItemModal(props: AddItemModalProps): JSX.Element
{
    const { status, data: recipes } = useQuery<Recipe[]>({
        queryKey: [ "recipes", props.orderId ],
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
                                {
                                    recipes.map((recipe) => <AddItem key={recipe.id} recipe={recipe} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}