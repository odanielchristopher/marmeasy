import { queryClient } from '@renderer/App';
import { clientsService } from '@renderer/app/services/clientsService';
import { UpdateClientParams } from '@renderer/app/services/clientsService/update';
import { useMutation } from '@tanstack/react-query';

export default function useUpdateClient() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: UpdateClientParams) => clientsService.update(data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['clients', 'getAll'],
      });
    },
  });

  return {
    updateClient: mutateAsync,
    isLoading: isPending,
  };
}
