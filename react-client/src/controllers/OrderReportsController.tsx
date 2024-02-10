const { VITE_API_URL } = import.meta.env;

type ReportByDate = {
    date: Date;
    count: number;
}

export async function getReport(): Promise<ReportByDate>
{
    const queryParameters = new URLSearchParams(
		{
			startDate: Date.parse("2020-01-01").toString(),
			endDate: Date.parse("2023-01-01").toString()
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
