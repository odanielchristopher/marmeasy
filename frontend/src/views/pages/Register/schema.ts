import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty('O nome é obrigatório.')
    .min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório.')
    .email('O e-mail deve ser válido.'),
  password: z
    .string()
    .nonempty('A senha é obrigatória.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
