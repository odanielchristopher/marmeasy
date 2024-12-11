import { z } from 'zod';

export const userEntity = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type User = z.infer<typeof userEntity>;
