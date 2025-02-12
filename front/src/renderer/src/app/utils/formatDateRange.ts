import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

export function formatDateRange(date: DateRange) {
  if (!date.from && !date.to) {
    return '';
  }

  const formatDate = (d: Date) => format(d, 'dd MMM, yyyy', { locale: ptBR });

  const formattedDateFrom = date.from ? formatDate(new Date(date.from)) : '';
  const formattedDateTo = date.to ? formatDate(new Date(date.to)) : '';

  if (!date.to) {
    return `${formattedDateFrom} -`;
  }

  return `${formattedDateFrom} - ${formattedDateTo}`;
}
