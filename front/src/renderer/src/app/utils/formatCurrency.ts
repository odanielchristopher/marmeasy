export function formatCurrency(value: number): string {
  if (isNaN(value)) {
    throw new Error('Invalid number provided');
  }

  // Formata o número com separador de milhares "." e decimal ","
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
