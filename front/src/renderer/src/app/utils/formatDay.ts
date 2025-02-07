import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDay(day: string, monthYear: string) {
  const date = parse(`${monthYear}-${day}`, 'yyyy-MM-dd', new Date());
  return format(date, 'EEEE, d \'de\' MMM. yyyy', { locale: ptBR });
}
