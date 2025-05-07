import { z } from 'zod';

export const dataStepSchema = z.object({
  orderType: z.enum(['BREAKFAST', 'LUNCH', 'DINNER'], {
    message: 'Escolha um tipo para o pedido',
  }),
  date: z.date({ message: 'Selecione uma data' }),
  customerId: z.string().nonempty('Cliente é obrigatório'),
});
