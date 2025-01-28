import { PaymentFormSchema } from '../../PaymentForm/usePaymentFormModal';

export default function useNewPaymentModal(onSuccess: () => void) {
  async function handleSubmit(data: PaymentFormSchema) {
    console.log(data.date.toISOString());
    onSuccess();
  }

  return {
    handleSubmit,
  };
}
