import { useState } from "react";
import { Unit } from "../../../models/Recipe";
import PickUnit from "./PickUnit";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QueryKeysUnit } from "../../../QueryKeys/QueryKeysUnit";
import getUnitList from "../../../controllers/UnitController";

type PickUnitModalProps = {
	recipeId: number;
	toogleModalCallback: () => void;
};

export default function PickUnitModal(props: PickUnitModalProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { recipeId, toogleModalCallback } = props;

	const [ unitList, setUnitList ] = useState<Unit[] | null>(
		queryClient.getQueryData<Unit[] | null>(QueryKeysUnit.all) || null
	);

	useQuery<Unit[]>({
		queryKey: QueryKeysUnit.all,
		queryFn: () => getUnitList(),
		onSuccess: (unitList) =>
		{
			setUnitList(unitList);
		},
		staleTime: Infinity
	});

	return (
		<div className="modal pick-modal">
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
								unitList && unitList.map((unit, index) =>
								{
									return <PickUnit
										key={index}
										recipeId={recipeId}
										unit={unit}
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
