import { queryClient } from '@renderer/App';
import { usersService } from '@renderer/app/services/usersService';
import { EditMeParams } from '@renderer/app/services/usersService/editMe';
import { FindMeResponse } from '@renderer/app/services/usersService/findme';
import { useMutation } from '@tanstack/react-query';

export default function useEditUserMutation() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: EditMeParams) => {
      return usersService.editMe(data);
    },
    onSuccess: ({ name, email }) => {
      // Atualiza o cache imediatamente
      queryClient.setQueryData<FindMeResponse | undefined>(['users', 'find-me'], (oldData) => ({
        ...oldData,
        name,
        email,
      }));

      // Invalida a query para refazer o fetch em segundo plano
      queryClient.invalidateQueries({
        queryKey: ['users', 'find-me'],
      });
    },
  });

  return {
    editUser: mutateAsync,
    isLoading: isPending,
  };
}
