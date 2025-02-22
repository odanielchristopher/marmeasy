import { queryClient } from '@renderer/App';
import { ordersService } from '@renderer/app/services/ordersService';
import toast from '@renderer/app/utils/toast';
import { useMutation } from '@tanstack/react-query';

export default function useDeleteOrderModal(onClose: () => void, handleHiddenOrderData: () => void) {
  const { mutateAsync: deleteOrder, isPending: isDeleting } = useMutation({
    mutationFn: async (orderId: string) => {
      await ordersService.remove({ id: orderId });
    },
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });

      toast({
        type: 'success',
        text: 'Pedido deletado com sucesso.',
      });

      onClose();
      handleHiddenOrderData();
    },
    onError: () => {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o pedido.',
      });
    },
  });

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
    }
  };

  return {
    handleDeleteOrder,
    isDeleting,
  };
}
