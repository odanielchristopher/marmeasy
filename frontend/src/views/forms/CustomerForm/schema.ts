import { z } from 'zod';

export const customerSchema = z.object({
  initialBalance: z.number().or(z.string().nonempty('O saldo é obrigatório')),
  name: z.string().nonempty('O nome do cliente é obrigatório'),
  type: z.enum(['INDIVIDUAL', 'BUSINESS'], {
    message: 'O tipo do cliente é obrigatório',
  }),
  color: z.string().nonempty('Escolha uma cor para o cliente'),
  phone: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;

        return value.length === 11 && value[2] === '9';
      },
      {
        message: 'O telefone precisa ser válido ou estar vazio',
      },
    ),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
