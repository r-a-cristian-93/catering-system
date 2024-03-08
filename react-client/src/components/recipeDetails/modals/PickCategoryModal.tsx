import { useState } from "react";
import { Category } from "../../../models/Recipe";
import PickCategory from "./PickCategory";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QueryKeysCategory } from "../../../QueryKeys/QueryKeysCategory";
import getCategoryList from "../../../controllers/CategoryController";

type PickCategoryModalProps = {
	recipeId: number;
	toogleModalCallback: () => void;
};

export default function PickCategoryModal(props: PickCategoryModalProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { recipeId, toogleModalCallback } = props;

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
		<div className="modal">
			<div className="modal-container">
				<div className="modal-box">
					<div className="modal-top">
						<h2 className="modal-title">Alege starea comenzii</h2>
						<span className="modal-close no-print" onClick={toogleModalCallback}>
							×
						</span>
					</div>
					<div className="modal-content">
						<div className="cards-small">
							{
								categoryList && categoryList.map((category, index) =>
								{
									return <PickCategory
										key={index}
										recipeId={recipeId}
										category={category}
										toogleModalCallback={toogleModalCallback}
									/>
								})
							}
							<br />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
