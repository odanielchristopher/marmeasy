export function formatPhone(phone: string) {
  // Remove tudo que não é número
  const cleaned = phone.replace(/\D/g, '');

  // Verifica se é celular (9 dígitos) ou fixo (8 dígitos) no número principal
  if (cleaned.length === 11) {
    // Formato celular: (11) 98765-4321
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  if (cleaned.length === 10) {
    // Formato fixo: (11) 1234-5678
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }

  // Número inválido ou incompleto
  return phone;
}
