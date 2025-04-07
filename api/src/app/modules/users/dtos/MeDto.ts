import { z } from 'zod';

export const MeDto = z.object({
  userId: z.string().uuid('Id precisa ser um tipo válido'),
});

export type IMeDto = z.infer<typeof MeDto>;
