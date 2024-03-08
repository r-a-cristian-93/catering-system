import { useState } from "react";
import { Unit } from "../../../models/Recipe";
import PickUnit from "./PickUnit";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QueryKeysUnit } from "../../../QueryKeys/QueryKeysUnit";
import getUnitsList from "../../../controllers/UnitController";

type PickUnitListProps = {
	recipeId: number;
	toggleModalCallback: () => void;
};

export default function PickUnitList(props: PickUnitListProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { recipeId, toggleModalCallback } = props;

	const [ unitList, setUnitList ] = useState<Unit[] | null>(
		queryClient.getQueryData<Unit[] | null>(QueryKeysUnit.all) || null
	);

	useQuery<Unit[]>({
		queryKey: QueryKeysUnit.all,
		queryFn: () => getUnitsList(),
		onSuccess: (unitList) =>
		{
			setUnitList(unitList);
		},
		staleTime: Infinity
	});

	return (
		<div className="cards-small">
			{
				unitList && unitList.map((unit, index) =>
				{
					return <PickUnit
						key={index}
						recipeId={recipeId}
						unit={unit}
						toogleModalCallback={toggleModalCallback}
					/>
				})
			}
			<br />
		</div>
	);
}
