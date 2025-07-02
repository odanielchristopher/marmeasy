import { z } from 'zod';

export const paymentSchema = z.object({
  value: z
    .number()
    .or(z.string().nonempty('O valor do pagamento é obrigatório.'))
    .refine(
      (input) => {
        const value = Number(input);

        return value > 0;
      },
      { message: 'O valor do pagamento deve ser maior que zero.' },
    ),
  customerId: z
    .string()
    .uuid('A escolha do cliente é obrigatória.')
    .nonempty('A escolha do cliente é obrigatória.'),
  description: z.string().optional(),
  type: z.enum(['CREDIT', 'DEBIT', 'CASH'], {
    message: 'O tipo de pagamento é obrigatório.',
  }),
  date: z.date({ message: 'A data é obrigatória.' }),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
