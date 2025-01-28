import { zodResolver } from '@hookform/resolvers/zod';
import { Payment, PaymentType } from '@renderer/app/entities/Payment';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const paymentFormSchema = z.object({
  type: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'CASH']),
  date: z.date(),
  value: z.number({ required_error: 'O valor é obrigatório.' }).or(z.string()),
});

export type PaymentFormSchema = z.infer<typeof paymentFormSchema>;

interface UsePaymentFormModalProps {
  payment?: Payment | null;
  onSubmit(data: PaymentFormSchema): Promise<void>;
  onSuccess?(): void;
}

export default function usePaymentFormModal({
  payment,
  onSubmit,
  onSuccess,
}: UsePaymentFormModalProps) {
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
      type: payment?.type || 'DEBIT_CARD',
      date: payment?.date ? new Date(payment.date) : new Date(),
      value: payment?.value || undefined,
    },
  });

  const selectedType = watch('type');

  function handleSelectedType(type: PaymentType) {
    setValue('type', type, { shouldValidate: true });
  }

  const handleSubmit = hookFormHandleSubmit((data) => {
    onSubmit(data);
    onSuccess?.();
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
