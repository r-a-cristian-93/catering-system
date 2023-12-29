export function formatDate(dateString: string | null): string
{
    if (dateString === null || dateString === "")
        return "";

    const date: Date = new Date(dateString);

    return date
        .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        .replace(new RegExp('/', 'g'), '.');
}

export function formatTime(dateString: string | null): string
{
    if (dateString === null || dateString === "")
        return "";

    const date: Date = new Date(dateString);

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