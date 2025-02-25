import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatMonthYear(monthYear: string) {
  const date = parse(monthYear, 'yyyy-MM', new Date());
  return format(date, 'MMMM, yyyy', { locale: ptBR });
}
