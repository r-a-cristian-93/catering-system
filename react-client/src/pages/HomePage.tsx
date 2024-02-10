import { BarChart } from "@mui/x-charts";
import { ReportByDate, getReportOfCancelDate, getReportOfDueDate, getReportOfPlacementDate, getReportOfShippingDate } from "../controllers/OrderReportsController";
import { useEffect, useState } from "react";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import * as Formatter from "../utils/Formatting";

async function getReports(
	startDateMillis: number,
	endDateMillis: number,
): Promise<ReportByDate[][]>
{
	const [ placement, due, cancel, shipping ] = await Promise.all([
		getReportOfPlacementDate(startDateMillis, endDateMillis),
		getReportOfDueDate(startDateMillis, endDateMillis),
		getReportOfCancelDate(startDateMillis, endDateMillis),
		getReportOfShippingDate(startDateMillis, endDateMillis)
	]);

	return [ placement, due, cancel, shipping ];
}

type LineChartDate = {
	datesAxis: string[],
	placementLine: number[],
	dueLine: number[],
	cancelLine: number[],
	shippingLine: number[],
}

function findValueByKey(key: Date, keyValueArray: ReportByDate[]): number
{
	const foundItem = keyValueArray.find(item => item.date === key);

	if (foundItem)
		return foundItem.count;
	else
		return 0;
}

export default function HomePage(): JSX.Element
{
	const startDateMillis: number = Date.parse("2020-01-01");
	const endDateMillis: number = Date.parse("2050-02-01");

	useEffect(() =>
	{
		void getReports(startDateMillis, endDateMillis).then((reports) =>
		{
			const [ placement, due, cancel, shipping ] = reports;

			const datesSet: Set<Date> = new Set<Date>([
				...Array.from(placement.map((each) => each.date)),
				...Array.from(due.map((each) => each.date)),
				...Array.from(cancel.map((each) => each.date)),
				...Array.from(shipping.map((each) => each.date)),
			]);

			const datesSorted: Date[] = Array
				.from(datesSet)
				.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

			const datesAxis: string[] = datesSorted.map((date) => Formatter.formatDate(date.toString()));

			const placementLine: number[] = datesSorted.map((date) => findValueByKey(date, placement));
			const dueLine: number[] = datesSorted.map((date) => findValueByKey(date, due));
			const cancelLine: number[] = datesSorted.map((date) => findValueByKey(date, cancel));
			const shippingLine: number[] = datesSorted.map((date) => findValueByKey(date, shipping));

			setLineChartDate({
				datesAxis: datesAxis,
				placementLine: placementLine,
				dueLine: dueLine,
				cancelLine: cancelLine,
				shippingLine: shippingLine
			});
		});


	}, []);

	const [ lineChartData, setLineChartDate ] = useState<LineChartDate | null>(null);

	return (
		<div className="box-content">
			<div className="chartGeneralContainer">
				<div className="datePicker">
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateRangePicker localeText={{ start: 'De la', end: 'Pana la' }} />
					</LocalizationProvider>
					<Button variant="contained" size="large">
						Actualizeaza
					</Button>
				</div>
				{
					lineChartData &&
					<div className="chartGeneral" >
						<BarChart
							xAxis={[
								{
									id: 'barCategories',
									data: lineChartData.datesAxis,
									scaleType: 'band',
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
									data: lineChartData.placementLine,
									label: "Comenzi plasate",
									color: "#22dd33"
								},
								{
									id: "due",
									data: lineChartData.dueLine,
									label: "Termene limita",
									color: "#dd22aa"
								},
								{
									id: "cancel",
									data: lineChartData.cancelLine,
									label: "Comenzi anulate",
									color: "#ff4400"
								},
								{
									id: "shipped",
									data: lineChartData.shippingLine,
									label: "Comenzi livrate",
									color: "#5555ff"
								}
							]}
							height={400}
						/>
					</div>
				}
			</div>
		</div>
	);
}
