import { DateRange } from 'react-day-picker';

export function formatDateRange(date: DateRange) {
  if (!date.from && !date.to) {
    return '';
  }

  const dateFrom = date.from && new Date(date.from);
  const dateTo = date.to && new Date(date.to);

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  const formattedDateFrom = formatter.format(dateFrom);
  const formattedDateTo = formatter.format(dateTo);

  if (!date.to) {
    return `${formattedDateFrom} -`;
  }

  return `${formattedDateFrom} - ${formattedDateTo}`;
}
