import { z } from 'zod';

export const SignUpDto = z.object({
  name: z
    .string({ message: 'Nome precisa ser string.' })
    .nonempty('Nome é obrigatório.'),
  email: z
    .string({ message: 'Email precisar ser string.' })
    .nonempty('Email é obrigatório.')
    .email('Email precisa ser válido.'),
  password: z
    .string({ message: 'Senha precisa ser string.' })
    .nonempty('Senha é obrigatório.')
    .min(6, 'Senha deve ter 6 dígitos.'),
});

export type ISignUpDto = z.infer<typeof SignUpDto>;
