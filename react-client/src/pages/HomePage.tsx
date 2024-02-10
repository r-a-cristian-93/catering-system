import { LineChart } from "@mui/x-charts";
import { getReport } from "../controllers/OrderReportsController";

export default function HomePage(): JSX.Element
{
	void getReport().then((report) =>
	{
		console.log(report);
	});

	return (<>
		<div className="box-content" id="order-table">
			Welcome!
		</div>
		<LineChart
			xAxis={[
				{
				id: 'barCategories',
				data: ['bar A', 'bar B', 'bar C'].slice(),
				scaleType: 'band',
				},
			]}
			series={[
				{
					id: "placement",
					data: [2, 5, 3],
					label: "ONE",
				},
			]}
			width={500}
			height={300}
		/>
		</>
	);
}
