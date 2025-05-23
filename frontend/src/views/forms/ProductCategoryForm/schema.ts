import { z } from 'zod';

import { isEmoji } from '@app/utils/isEmoji';

export const productCategorySchema = z.object({
  name: z.string().nonempty('Nome da categoria é obrigatória'),
  icon: z
    .string()
    .nonempty('Emoji da categoria é obrigatório')
    .refine((value) => isEmoji(value), { message: 'Precisa ser um emoji' }),
});

export type ProductCategoryForm = z.infer<typeof productCategorySchema>;
