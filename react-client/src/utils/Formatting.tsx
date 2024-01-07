export function formatDate(string: string | null): string
{
	if (string === null || string === "")
		return "";

	const date: Date = new Date(string);

	return date
		.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
		.replace(new RegExp('/', 'g'), '.');
}

export function formatTime(string: string | null): string
{
	if (string === null || string === "")
		return "";

	const date: Date = new Date(string);

	return date
		.toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit'
		});
}

export function formatCurrency(value: number | null): string
{
	if (value === null)
		return "";

	return value.toFixed(2) + ' Lei';
}

export function formatDateString(string: string | null): string
{
	if (string === null || string === "")
		return "";

	const date: Date = new Date(string);

	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const dateString = year + '-' + month + '-' + day;

	return dateString;
}

export function formatTimeString(string: string | null): string
{
	if (string === null || string === "")
		return "";

	const date: Date = new Date(string);

	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const timeString = hours + ':' + minutes;

	return timeString;
}

export function dateFromDateTimeString(dateString: string, timeString: string): Date
{
	const dateComponents = dateString.split("-");
	const year = parseInt(dateComponents[ 0 ], 10);
	const month = parseInt(dateComponents[ 1 ], 10) - 1; // Month is zero-based
	const day = parseInt(dateComponents[ 2 ], 10);

	const timeComponents = timeString.split(":");
	const hours = parseInt(timeComponents[ 0 ], 10);
	const minutes = parseInt(timeComponents[ 1 ], 10);

	const date = new Date(year, month, day, hours, minutes);

	return date;
}