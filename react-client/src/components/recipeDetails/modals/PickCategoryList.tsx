import { useState } from "react";
import { Category } from "../../../models/Recipe";
import PickCategory from "./PickCategory";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QueryKeysCategory } from "../../../QueryKeys/QueryKeysCategory";
import getCategoryList from "../../../controllers/CategoryController";

type PickCategoryListProps = {
	recipeId: number;
	toggleModalCallback: () => void;
};

export default function PickCategoryList(props: PickCategoryListProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { recipeId, toggleModalCallback } = props;

	const [ categoryList, setCategoryList ] = useState<Category[] | null>(
		queryClient.getQueryData<Category[] | null>(QueryKeysCategory.all) || null
	);

	useQuery<Category[]>({
		queryKey: QueryKeysCategory.all,
		queryFn: () => getCategoryList(),
		onSuccess: (categoryList) =>
		{
			setCategoryList(categoryList);
		},
		staleTime: Infinity
	});

	return (
		<div className="cards-small">
			{
				categoryList && categoryList.map((category, index) =>
				{
					return <PickCategory
						key={index}
						recipeId={recipeId}
						category={category}
						toogleModalCallback={toggleModalCallback}
					/>
				})
			}
			<br />
		</div>
	);
}
