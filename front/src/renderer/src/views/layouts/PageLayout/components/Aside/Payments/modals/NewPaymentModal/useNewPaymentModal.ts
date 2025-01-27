import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const paymentFormSchema = z.object({
  type: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'CASH']),
  date: z.date(),
  value: z.number(),
});

export type PaymentFormSchema = z.infer<typeof paymentFormSchema>;

export default function useNewPaymentModal() {
  const {
      register,
      handleSubmit: hookFormHandleSubmit,
      formState: { errors },
      control,
    } = useForm<PaymentFormSchema>({
      resolver: zodResolver(paymentFormSchema),
    });

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log({ data });
  });

  return {
    errors,
    control,
    register,
    handleSubmit,
  };
}
