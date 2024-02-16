import { BarChart } from "@mui/x-charts";
import { ReportByDate, getReportOfCancelDate, getReportOfDueDate, getReportOfPlacementDate, getReportOfShippingDate } from "../controllers/OrderReportsController";
import { useEffect, useState } from "react";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import * as Formatter from "../utils/Formatting";
import { DateRange } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";

async function getReports(startDateMillis: number | null | undefined, endDateMillis: number | null | undefined): Promise<ReportByDate[][]>
{
	// Display data from last 30 days as fallback
	if (!endDateMillis) endDateMillis = new Date().getTime();
	if (!startDateMillis) startDateMillis = endDateMillis - 1000*60*60*24*30;

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
	// Display data from last 30 days initially
	const endDateMillis: number = new Date().getTime();
	const startDateMillis: number = endDateMillis - 1000*60*60*24*30;

	const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([
		dayjs(startDateMillis),
		dayjs(endDateMillis),
	]);

	dateRange[0]?.toDate().getTime()

	useEffect(() =>
	{
		updateData();
	}, []);

	function updateData(): void
	{
		void getReports(dateRange[0]?.toDate().getTime(), dateRange[1]?.toDate().getTime()).then((reports) =>
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

			setLineChartData({
				datesAxis: datesAxis,
				placementLine: placementLine,
				dueLine: dueLine,
				cancelLine: cancelLine,
				shippingLine: shippingLine
			});
		});

	}

	const [ lineChart, setLineChartData ] = useState<LineChartDate | null>(null);

	function handleUpdate(): void
	{
		updateData();
	}

	return (
		<div className="box-content">
			<div className="chartGeneralContainer">
				<div className="datePicker">
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateRangePicker
							localeText={{ start: 'De la', end: 'Pana la' }}
							value={dateRange}
							onChange={(newRange) =>
							{
								setDateRange(newRange)
							}}
						/>
					</LocalizationProvider>
					<Button variant="contained" size="large" onClick={handleUpdate}>
						Actualizeaza
					</Button>
				</div>
				{
					lineChart &&
					<div className="chartGeneral" >
						<BarChart
							xAxis={[
								{
									id: 'barCategories',
									data: lineChart.datesAxis,
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
									data: lineChart.placementLine,
									label: "Comenzi plasate",
									color: "#22dd33"
								},
								{
									id: "due",
									data: lineChart.dueLine,
									label: "Termene limita",
									color: "#dd22aa"
								},
								{
									id: "cancel",
									data: lineChart.cancelLine,
									label: "Comenzi anulate",
									color: "#ff4400"
								},
								{
									id: "shipped",
									data: lineChart.shippingLine,
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
