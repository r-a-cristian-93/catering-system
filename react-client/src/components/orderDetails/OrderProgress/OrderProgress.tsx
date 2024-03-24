import OrderProgressStep from "./OrderProgressStep";
import css from "./OrderProgress.module.css"
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";

export type OrderStep = {
	name: string;
	date: string | null;
}

export default function OrderProgress(): JSX.Element
{
	const { order } = useOrderDetailsContext();

	const steps: OrderStep[] = [
		{ name: "Preluare", date: order?.placementDate || '' },
		{ name: "Aprovizionare", date: order?.supplyDate || '' },
		{ name: "Preparare", date: order?.productionDate || '' },
		{ name: "Pregatire", date: order?.preparingDate || '' },
		{ name: "Expediere", date: order?.shippingDate || '' }
	];

	return (
		<div className={css.stepper_wrapper}>
			{
				steps.map((step, index) => (
					<OrderProgressStep
						key={index}
						step={step}
					/>
				))
			}
		</div>
	);
}