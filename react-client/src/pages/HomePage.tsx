import { getReport } from "../controllers/OrderReportsController";

export default function HomePage(): JSX.Element
{
	void getReport().then((report) =>
	{
		console.log(report);
	});

	return (
		<div className="box-content" id="order-table">
			Welcome!
		</div>
	);
}
