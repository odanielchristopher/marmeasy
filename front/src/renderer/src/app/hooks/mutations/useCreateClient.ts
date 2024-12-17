import { queryClient } from '@renderer/App';
import { clientsService } from '@renderer/app/services/clientsService';
import { CreateClientParams } from '@renderer/app/services/clientsService/create';
import { useMutation } from '@tanstack/react-query';

export default function useCreateClient() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateClientParams) => clientsService.create({
      ...data,
    }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['clients', 'getAll'],
        type: 'active',
        exact: true,
      });
    },
  });

  return {
    createClient: mutateAsync,
    isLoading: isPending,
  };
}
