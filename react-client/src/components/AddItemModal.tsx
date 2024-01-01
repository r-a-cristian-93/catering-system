import { useQuery } from "react-query";
import { Recipe } from "../models/Recipe/Recipe";
import { getRecipes } from "../controllers/RecipeController";
import AddItem from "./AddItem";
import { OrderItem } from "../controllers/OrderItemsController";

type AddItemModalProps = {
    toogleModalCallback: () => void;
    addSuccessfulCallback: (orderItem: OrderItem) => void;
    orderId: number;
}

export default function AddItemModal(props: AddItemModalProps): JSX.Element
{
    const { isSuccess, data: recipes } = useQuery<Recipe[]>({
        queryKey: [ "recipes", props.orderId ],
        queryFn: () => getRecipes()
    });

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
                                    isSuccess && recipes.map((recipe) =>
                                    {
                                        return <AddItem
                                            key={recipe.id}
                                            orderId={props.orderId}
                                            recipe={recipe}
                                            addSuccessfulCallback={props.addSuccessfulCallback} />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}