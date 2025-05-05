import { z } from 'zod';

export const cartStepSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().nonempty(),
        imagePath: z.string().optional(),
        name: z.string().nonempty(),
        description: z.string().optional(),
        unitPrice: z.number(),
        quantity: z.number(),
      }),
    )
    .min(1, 'Adicione pelo menos 1 item'),
});
