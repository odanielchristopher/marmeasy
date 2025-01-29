export function formatDateRange(date: { from: Date; to: Date }) {
  const dateFrom = new Date(date.from);
  const dateTo = new Date(date.to);

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  const formattedDateFrom = formatter.format(dateFrom);
  const formattedDateTo = formatter.format(dateTo);

  if (formattedDateFrom === formattedDateTo) {
    return formattedDateFrom;
  }

  return `${formattedDateFrom} - ${formattedDateTo}`;
}
