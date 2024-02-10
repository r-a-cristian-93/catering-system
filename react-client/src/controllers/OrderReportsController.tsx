const { VITE_API_URL } = import.meta.env;

export type ReportByDate = {
    date: Date;
    count: number;
}

export async function getReport(startDateMilis: number, endDateMilis: number): Promise<ReportByDate[]>
{
    const queryParameters = new URLSearchParams(
		{
			startDate: startDateMilis.toString(),
			endDate: endDateMilis.toString()
		}
	);

	const url = VITE_API_URL + "/orders/reportOfPlacementDate?" + queryParameters.toString();

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	return response.json();
}
