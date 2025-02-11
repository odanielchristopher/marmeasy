import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDay(day: string, monthYear: string) {
  const date = parse(`${monthYear}-${day}`, 'yyyy-MM-dd', new Date());
  // eslint-disable-next-line quotes
  return format(date, "EEEE, d 'de' MMM. yyyy", { locale: ptBR });
}
