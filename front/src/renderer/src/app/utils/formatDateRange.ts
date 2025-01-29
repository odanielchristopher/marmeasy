import { formatDate } from './formatDate';

export function formatDateRange(date: { from: Date, to: Date }) {
  const dateFrom = date.from && new Date(date.from);
  const dateTo = date.to && new Date(date.to);

  return `${formatDate(dateFrom)} - ${formatDate(dateTo)}`;
}
