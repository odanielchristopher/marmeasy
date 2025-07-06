import toast from 'react-hot-toast';

import { useCreatePayment } from '@app/hooks/payments/useCreatePayment';
import { PaymentFormData } from '@views/forms/PaymentForm/schema';

interface IUseNewPaymentModalController {
  onSuccess(): void;
}

export function useNewPaymentModalController({
  onSuccess,
}: IUseNewPaymentModalController) {
  const { createPayment, isLoading } = useCreatePayment();

  async function handleSubmit(formData: PaymentFormData) {
    try {
      await createPayment({
        ...formData,
        date: formData.date.toISOString(),
        value: Number(formData.value),
      });

      onSuccess();
      toast.success('O pagamento foi criado com sucesso!');
    } catch {
      toast.error('Ocorreu um erro ao cadastrar o novo pagamento.');
    }
  }

  return {
    isLoading,
    handleSubmit,
  };
}
