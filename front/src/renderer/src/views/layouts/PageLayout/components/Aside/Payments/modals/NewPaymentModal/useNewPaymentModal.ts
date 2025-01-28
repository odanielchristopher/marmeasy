import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentType } from '@renderer/app/entities/Payment';
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
      setFocus,
      watch,
      setValue,
    } = useForm<PaymentFormSchema>({
      resolver: zodResolver(paymentFormSchema),
      defaultValues: {
        type: 'DEBIT_CARD',
      },
    });

  const selectedType = watch('type');

  function handleSelectedType(type: PaymentType) {
    setValue('type', type, { shouldValidate: true });
  }

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log({ data });
  });

  return {
    errors,
    control,
    selectedType,
    register,
    setFocus,
    handleSelectedType,
    handleSubmit,
  };
}
