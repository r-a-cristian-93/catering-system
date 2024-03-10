import { RecipeItem } from "../../models/Recipe.tsx";
import * as Formatter from "../../utils/Formatting.tsx";
import { useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QueryKeysOrder } from "../../QueryKeys/QueryKeysOrder.tsx";
import { QueryKeysRecipe } from "../../QueryKeys/QueryKeysRecipe.tsx";
import { getRecipeItems } from "../../controllers/RecipeItemsController.tsx";
import RecipeItemComponent from "./RecipeItemComponent.tsx";
import { AddRecipeItemTable } from "./modals/AddRecipeItemTable.tsx";
import Modal from "../generic/Modal/Modal.tsx";
import AddButton from "../generic/AddButton/AddButton.tsx";
import TableList from "../generic/TableList/TableList.tsx";

type RecipeItemsProps = {
    recipeId: number;
}

function getTotalCost(recipeItems: RecipeItem[]): number
{
    return recipeItems.reduce((total, recipeItem) =>
        total + recipeItem.quantity * recipeItem.ingredient.price, 0
    );
}

export default function RecipeItems(props: RecipeItemsProps): JSX.Element
{
    const queryClient: QueryClient = useQueryClient();
    const recipeId = props.recipeId;

    // fetch order items
    const { isSuccess: recipeItemsQuerySucess } = useQuery<RecipeItem[]>({
        queryKey: QueryKeysRecipe.itemsByRecipeId(recipeId),
        queryFn: () => getRecipeItems(recipeId),
        onSuccess: (recipeItems) =>
        {
            // set recipeItems
            setRecipeItems(recipeItems);
        }
    });

    const [ recipeItems, setRecipeItems ] = useState<RecipeItem[] | null>(
        queryClient.getQueryData(QueryKeysOrder.itemsByOrderId(recipeId)) as RecipeItem[]
    );

    const [ isModalActive, setModalActive ] = useState<boolean>(false);

    recipeItems?.sort((a, b) => a.id - b.id);

    function handleChildChange(recipeItem: RecipeItem): void
    {
        if (recipeItems !== null)
        {
            const newItems: RecipeItem[] = [ ...recipeItems ];
            const index: number = recipeItems.findIndex((item) => item.id === recipeItem.id);

            if (index !== -1)
            {
                newItems[ index ] = recipeItem;
                setRecipeItems(newItems);
            }
        }
    }

    function handleChildDelete(recipeItem: RecipeItem): void
    {
        setRecipeItems((prevItems) => prevItems &&
            prevItems.filter((item) => item.id !== recipeItem.id)
        );
    }

    function handleToogleModal(): void
    {
        setModalActive(prev => !prev);
    }

    function handleAddItemSuccessful(recipeItem: RecipeItem): void
    {
        // optimistic update
        setRecipeItems((prevItems) => prevItems &&
            [ ...prevItems, recipeItem ]
        );
    }

    return (
        <>
            <TableList className="details-table">
                <thead>
                    <tr className="font-size-120">
                        <th>Ingredient</th>
                        <th>Cantitate</th>
                        <th>Pret unitar</th>
                        <th>Cost total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        recipeItemsQuerySucess && recipeItems && recipeItems.map((recipeItem) =>
                            <RecipeItemComponent key={recipeItem.id} recipeItem={recipeItem}
                                changeCallback={handleChildChange}
                                deleteCallback={handleChildDelete} />
                        )
                    }
                    <tr id="det_total" className="font-size-140">
                        <th></th>
                        <th></th>
                        <th>Total:</th>
                        <th>
                            {
                                recipeItemsQuerySucess && recipeItems && Formatter.formatCurrency(getTotalCost(recipeItems))
                            }
                        </th>
                    </tr>
                </tbody>
            </TableList>

            <AddButton text="Adaugă ingredient" onClick={handleToogleModal} />

            {
                isModalActive &&
                <Modal toggleCallback={handleToogleModal} title="Adaugă ingredient">
                    <AddRecipeItemTable
                        key={Math.round(Math.random() * 100)}
                        recipeId={recipeId}
                        addSuccessfulCallback={handleAddItemSuccessful}
                    />
                </Modal>
            }
        </>
    );
}
