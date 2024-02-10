import { LineChart } from "@mui/x-charts";
import { getReport } from "../controllers/OrderReportsController";
import { useEffect, useState } from "react";
import * as Formatter from "../utils/Formatting";

export default function HomePage(): JSX.Element
{
	const startDateMilis: number =  Date.parse("2020-01-01");
	const endDateMilis: number = Date.parse("2050-02-01");

	useEffect(()=>
	{
		void getReport(startDateMilis, endDateMilis).then((report) =>
		{
			const reportMap: Map<string, number> = new Map(report.map((entry) =>
			{
				return [
					Formatter.formatDate(entry.date.toString()),
					entry.count
				]
			}));

			setReportPlacementDate(reportMap);
		});
	}, [] );

	const [reportPlacementDate, setReportPlacementDate] = useState<Map<string, number>>(new Map<string, number>([]));

	return (<>
		<div className="box-content" id="order-table">
			Welcome!
		</div>
		<LineChart
			xAxis={[
				{
				id: 'barCategories',
				data: Array.from(reportPlacementDate.keys()).slice(),
				scaleType: 'point',
				},
			]}
			yAxis={[
				{
					min: 0,
				}
			]}
			series={[
				{
					id: "placement",
					data: Array.from(reportPlacementDate.values()),
					label: "Order Placement",
				},
			]}
			width={500}
			height={300}
		/>
		</>
	);
}
