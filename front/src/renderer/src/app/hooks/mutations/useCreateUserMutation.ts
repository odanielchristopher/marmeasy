import { authService } from '@renderer/app/services/authService';
import { SingUpParams } from '@renderer/app/services/authService/signUp';
import { useMutation } from '@tanstack/react-query';

export default function useCreateUserMutation() {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SingUpParams) => {
      return authService.singUp(data);
    },
  });

  return {
    createUser: mutateAsync,
    isLoading,
  };
}
