import { z } from 'zod';

export const dataStepSchema = z.object({
  orderType: z.enum(['BREAKFAST', 'LUNCH', 'DINNER']),
  date: z.date(),
  customer: z.object({
    id: z.string().optional(),
    name: z.string().nonempty(),
  }),
});
