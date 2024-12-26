export function formatCurrency(value: number): string {
  if (isNaN(value)) {
      throw new Error('Invalid number provided');
  }

  // Converte o número para uma string no formato com duas casas decimais
  return value.toFixed(2).replace('.', ',');
}
