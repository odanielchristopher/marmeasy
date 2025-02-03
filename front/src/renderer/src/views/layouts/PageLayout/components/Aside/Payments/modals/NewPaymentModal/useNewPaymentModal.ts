import { queryClient } from '@renderer/App';
import { Client } from '@renderer/app/entities/Client';
import { Payment } from '@renderer/app/entities/Payment';
import { paymentsService } from '@renderer/app/services/paymentsService';
import { CreatePaymentParams } from '@renderer/app/services/paymentsService/create';
import { PaginatedResponse } from '@renderer/app/services/types';
import { calculateNewBalance } from '@renderer/app/utils/calculateNewBalance';
import toast from '@renderer/app/utils/toast';
import { InfiniteData, useMutation } from '@tanstack/react-query';
import { PaymentFormSchema } from '../../PaymentForm/usePaymentFormModal';

interface UseNewPaymentModalProps {
  client: Client | null;
  onSuccess(): void;
}

export default function useNewPaymentModal({
  client,
  onSuccess,
}: UseNewPaymentModalProps) {
  const { mutateAsync: createPayment, isPending: isLoading } = useMutation({
    mutationFn: async (data: CreatePaymentParams) =>
      paymentsService.create(data),

    onSuccess: (newPayment: Payment) => {
      queryClient.setQueryData(
        ['payments', 'getAll', { id: newPayment.clientId }],
        (payments: Payment[] | undefined) => [...(payments ?? []), newPayment],
      );

      queryClient.setQueryData(
        ['clients', 'getAll'],
        (oldData: InfiniteData<PaginatedResponse<Client[]>>) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((oldClient) =>
                oldClient.id === newPayment.clientId
                  ? {
                      ...oldClient,
                      balance: calculateNewBalance({
                        currentBalance: Number(oldClient.balance),
                        newValue: newPayment.value,
                      }),
                    }
                  : oldClient,
              ),
            })),
          };
        },
      );
    },
  });

  async function handleSubmit(data: PaymentFormSchema) {
    const { date, type, value } = data;

    try {
      await createPayment({
        type,
        clientId: client!.id,
        date: date.toISOString(),
        value: Number(value),
      });

      toast({
        type: 'success',
        text: 'Pagamento registrado com sucesso.',
      });

      onSuccess();
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao criar pagamento.',
      });
    }
  }

  return {
    isLoading,
    handleSubmit,
  };
}
