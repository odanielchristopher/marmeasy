import { z } from 'zod';

export const SignInDto = z.object({
  email: z
    .string({ message: 'Email precisar ser string.' })
    .nonempty('Email é obrigatório.')
    .email('Email precisa ser válido.'),
  password: z
    .string({ message: 'Senha precisa ser string.' })
    .nonempty('Senha é obrigatório.')
    .min(6, 'Senha deve ter 6 dígitos.'),
});

export type ISignInDto = z.infer<typeof SignInDto>;
