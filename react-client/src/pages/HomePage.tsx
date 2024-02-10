import { LineChart } from "@mui/x-charts";
import { ReportByDate, getReportOfCancelDate, getReportOfDueDate, getReportOfPlacementDate, getReportOfShippingDate } from "../controllers/OrderReportsController";
import { useEffect, useState } from "react";
import * as Formatter from "../utils/Formatting";

function setReportData(
	startDateMillis: number,
	endDateMillis: number,
	fetchFunction: (start: number, end: number) => Promise<ReportByDate[]>,
	setFunction: (value: React.SetStateAction<Map<string, number>>) => void
): void
	{
		void fetchFunction(startDateMillis, endDateMillis).then((report) =>
		{
			const reportMap: Map<string, number> = new Map(report.map((entry) =>
			{
				return [
					Formatter.formatDate(entry.date.toString()),
					entry.count
				]
			}));

			setFunction(reportMap);
		});
	}

export default function HomePage(): JSX.Element
{
	const startDateMilis: number =  Date.parse("2020-01-01");
	const endDateMilis: number = Date.parse("2050-02-01");

	useEffect(()=>
	{
		setReportData(startDateMilis, endDateMilis, getReportOfPlacementDate, setReportPlacementDate);
		setReportData(startDateMilis, endDateMilis, getReportOfDueDate, setReportDueDate);
		setReportData(startDateMilis, endDateMilis, getReportOfCancelDate, setReportCancelDate);
		setReportData(startDateMilis, endDateMilis, getReportOfShippingDate, setReportShippingDate);
	}, [] );

	const [reportPlacementDate, setReportPlacementDate] = useState<Map<string, number>>(new Map<string, number>([]));
	const [reportDueDate, setReportDueDate] = useState<Map<string, number>>(new Map<string, number>([]));
	const [reportCancelDate, setReportCancelDate] = useState<Map<string, number>>(new Map<string, number>([]));
	const [reportShippingDate, setReportShippingDate] = useState<Map<string, number>>(new Map<string, number>([]));

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
				}
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
				}
			]}
			width={500}
			height={300}
		/>
		</>
	);
}
