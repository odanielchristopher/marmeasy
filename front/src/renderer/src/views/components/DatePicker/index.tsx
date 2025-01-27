import { ptBR } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import { StyledDayPickerWrapper } from './styles'; // Corrigido o caminho do módulo

interface DatePickerProps {
  value: Date;
  onChange?(date: Date): void;
}

export function StyledDatePicker({ value, onChange }: DatePickerProps) {
  return (
    <StyledDayPickerWrapper>
      <DayPicker
        locale={ptBR}
        selected={value}
        mode="single"
        onSelect={(date) => onChange?.(date ?? new Date())}
        className="rdp-root"
        classNames={{
          caption: 'rdp-caption', // Estilização do cabeçalho
          nav: 'rdp-nav', // Botões de navegação
          nav_button_previous: 'rdp-nav_button_previous',
          nav_button_next: 'rdp-nav_button_next',
          head_cell: 'rdp-head_cell', // Cabeçalho dos dias da semana
          weekday: 'rdp-weekday', // Estilo dos dias da semana
          month_grid: 'rdp-month_grid', // Estilo do grid de dias
          day: 'rdp-day', // Estilo de um dia
          day_today: 'rdp-day_today', // Estilo do dia atual
          day_selected: 'rdp-day_selected', // Estilo do dia selecionado
          day_button: 'rdp-day_button', // Botões dos dias
        }}
      />
    </StyledDayPickerWrapper>
  );
}
