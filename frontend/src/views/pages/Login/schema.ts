import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório.')
    .email('O e-mail deve ser válido.'),
  password: z
    .string()
    .nonempty('A senha é obrigatória.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
