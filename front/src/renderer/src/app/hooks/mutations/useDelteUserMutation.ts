import { usersService } from '@renderer/app/services/usersService';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../useAuth';

export default function useDeleteUserMutation() {
  const { signout } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      await usersService.deleteMe();
    },
    onSuccess: () => {
      window.location.reload();
      signout();
    },
  });

  return {
    deleteUser: mutateAsync,
    isLoading: isPending,
  };
}
