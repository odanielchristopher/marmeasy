export function isCNPJValid(cnpj: string): boolean {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]/g, '');

  // Verifica se tem 14 caracteres
  if (cnpj.length !== 14) return false;

  // Verifica se o CNPJ não é uma sequência de números repetidos
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  // Calcula o primeiro dígito verificador
  let soma = 0;
  let pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj[i]) * pesos1[i];
  }
  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;

  // Calcula o segundo dígito verificador
  soma = 0;
  let pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj[i]) * pesos2[i];
  }
  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;

  // Verifica se os dígitos verificadores são válidos
  return cnpj[12] === digito1.toString() && cnpj[13] === digito2.toString();
}
