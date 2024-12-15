import { queryClient } from '@renderer/App';
import { usersService } from '@renderer/app/services/usersService';
import { useMutation } from '@tanstack/react-query';

export default function useDeleteUserMutation() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      await usersService.deleteMe();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users', 'find-me'],
        refetchType: 'active',
      });
    },
  });

  return {
    deleteUser: mutateAsync,
    isLoading: isPending,
  };
}
