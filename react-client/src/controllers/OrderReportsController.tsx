import axios from "axios";
const { VITE_API_URL } = import.meta.env;

export type ReportByDate = {
    date: Date;
    count: number;
}

export async function getReportOfPlacementDate(startDateMilis: number, endDateMilis: number): Promise<ReportByDate[]>
{
    return getReport("reportOfPlacementDate", startDateMilis, endDateMilis);
}

export async function getReportOfDueDate(startDateMilis: number, endDateMilis: number): Promise<ReportByDate[]>
{
    return getReport("reportOfDueDate", startDateMilis, endDateMilis);
}

export async function getReportOfCancelDate(startDateMilis: number, endDateMilis: number): Promise<ReportByDate[]>
{
    return getReport("reportOfCancelDate", startDateMilis, endDateMilis);
}

export async function getReportOfShippingDate(startDateMilis: number, endDateMilis: number): Promise<ReportByDate[]>
{
    return getReport("reportOfShippingDate", startDateMilis, endDateMilis);
}

async function getReport(path: string, startDateMilis: number, endDateMilis: number): Promise<ReportByDate[]>
{
    const queryParameters = new URLSearchParams(
		{
			startDate: startDateMilis.toString(),
			endDate: endDateMilis.toString()
		}
	);

	const url = VITE_API_URL + "/orders/"+ path;

	const response = await axios.get<ReportByDate[]>(url, {
		withCredentials: true,
		params: queryParameters
	});

	return response.data;
}
