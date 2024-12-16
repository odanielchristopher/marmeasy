import { authService } from '@renderer/app/services/authService';
import { SingInParams } from '@renderer/app/services/authService/singIn';
import { useMutation } from '@tanstack/react-query';

export default function useLoginQuery() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SingInParams) => {
      return authService.signIn(data);
    },
  });

  return {
    login: mutateAsync,
    isLoading: isPending,
  };
}
