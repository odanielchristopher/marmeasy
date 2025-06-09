import { z } from 'zod';

export const productSchema = z.object({
  imagePath: z.instanceof(File).or(z.string()).optional(),
  name: z
    .string()
    .nonempty({ message: 'Nome do produto é obrigatório' })
    .max(40, 'Máximo 40 caracteres'),
  description: z
    .string()
    .max(110, { message: 'Máximo 110 caracteres' })
    .optional(),
  price: z
    .number()
    .or(z.string().nonempty('Valor do produto é obrigatório'))
    .refine(
      (value) => {
        const price = typeof value === 'string' ? Number(value) : value;

        return price > 0;
      },
      { message: 'Valor deve ser maior que zero' },
    ),
  categoryId: z.string().optional().or(z.string().uuid()),
});

export type ProductFormData = z.infer<typeof productSchema>;
