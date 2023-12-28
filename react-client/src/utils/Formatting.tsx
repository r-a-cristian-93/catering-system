export function formatDate(fullDate: string): string
{
    const date: Date = new Date(fullDate);

    return date
        .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        .replace(new RegExp('/', 'g'), '.');
}

export function formatTime(fullDate: string): string
{
    const date: Date = new Date(fullDate);

    return date
        .toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });
}

export function formatCurrency(value: number): string
{
    return value.toFixed(2) + ' Lei';
}
