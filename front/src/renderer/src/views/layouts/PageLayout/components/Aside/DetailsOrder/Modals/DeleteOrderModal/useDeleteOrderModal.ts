import { queryClient } from '@renderer/App';
import { useClientsQuery } from '@renderer/app/hooks/queries/useClientsQuery';
import { ordersService } from '@renderer/app/services/ordersService';
import toast from '@renderer/app/utils/toast';
import { useMutation } from '@tanstack/react-query';

export default function useDeleteOrderModal(
  onClose: () => void,
  handleHiddenOrderData: () => void,
) {
  const { clients } = useClientsQuery();

  const { mutateAsync: deleteOrder, isPending: isDeleting } = useMutation({
    mutationFn: async (orderId: string) => {
      await ordersService.remove({ id: orderId });
    },
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });

      toast({
        type: 'success',
        text: 'Pedido deletado com sucesso.',
      });

      onClose();
      handleHiddenOrderData();
    },
  });

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o pedido.',
      });
    }
  };

  function findClientById(id: string) {
    return clients.find((client) => client.id === id);
  }

  return {
    handleDeleteOrder,
    isDeleting,
    findClientById,
  };
}
