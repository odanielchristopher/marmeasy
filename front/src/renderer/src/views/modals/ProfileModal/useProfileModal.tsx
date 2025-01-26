import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { queryClient } from '@renderer/App';
import useFindMeQuery from '@renderer/app/hooks/queries/useFindMeQuery';

import { useModals } from '@renderer/app/hooks/useModals';
import toast from '@renderer/app/utils/toast';

import { useAuth } from '@renderer/app/hooks/useAuth';
import { usersService } from '@renderer/app/services/usersService';
import { EditMeParams } from '@renderer/app/services/usersService/editMe';
import { FindMeResponse } from '@renderer/app/services/usersService/findme';
import { useNavigate } from 'react-router-dom';

const schema = z
  .object({
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .min(2, 'Nome deve conter pelo menos 2 caracteres.'),
    email: z
      .string()
      .min(1, 'E-mail é obrigatório.')
      .email('Informe um e-mail válido.'),
    currentPassword: z
      .string()
      .min(1, 'Senha atual é obrigatória.')
      .min(6, 'Senha deve conter pelo menos 6 dígitos.'),
    newPassword: z
      .string()
      .optional()
      .refine((value) => !value || value.length >= 6, {
        message: 'A sennha precisa ter pelo menos 6 caracteres ou estar vazio',
      }),
    confirmPassword: z.string().min(0),
  })
  .refine(
    (data) => {
      // Valida somente se "newPassword" estiver preenchida
      if (data.newPassword) {
        return data.newPassword === data.confirmPassword;
      }

      return true; // Validação passa se "newPassword" estiver vazia
    },
    {
      message: 'As senhas não coincidem.',
      path: ['confirmPassword'], // Indica onde o erro ocorre
    },
  );

type FormData = z.infer<typeof schema>;

export default function useProfileController() {
  const [wantChangePassword, setWantChangePassword] = useState(false);
  const { signout } = useAuth();
  const navigateTo = useNavigate();

  const {
    isProfileModalOpen: isOpen,
    handleCloseProfileModal,
    isDeleteUserModalOpen,
    handleOpenDeleteUserModal,
    handleCloseDeleteUserModal,
  } = useModals();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { data } = useFindMeQuery(isOpen);
  const { mutateAsync: editUser, isPending: isLoading } = useMutation({
    mutationFn: async (data: EditMeParams) => {
      return usersService.editMe(data);
    },
    onSuccess: ({ name, email }) => {
      // Atualiza o cache imediatamente
      queryClient.setQueryData<FindMeResponse | undefined>(
        ['users', 'find-me'],
        (oldData) => ({
          ...oldData,
          name,
          email,
        }),
      );

      // Invalida a query para refazer o fetch em segundo plano
      queryClient.invalidateQueries({
        queryKey: ['users', 'find-me'],
        exact: true,
        refetchType: 'all',
      });
    },
  });

  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: async () => {
      await usersService.deleteMe();
    },
    onSuccess: () => {
      toast({
        type: 'default',
        text: 'Conta exluída',
      });

      navigateTo('/login', { replace: true });

      signout();
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset(data);
    }

    return () => {
      setWantChangePassword(false);
    };
  }, [data, isOpen]);

  function handleWannaChangePassword() {
    setWantChangePassword((prevState) => !prevState);
  }

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { name, email, currentPassword, newPassword } = data;

      await editUser({
        name,
        email,
        currentPassword,
        newPassword: newPassword ? newPassword : undefined,
      });

      handleCloseProfileModal();
      toast({
        type: 'success',
        text: 'Seus dados foram editados',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          type: 'danger',
          text: error.response?.data.error,
        });

        return;
      }

      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar seus dados.',
      });
    }
  });

  const handleDeleteUser = useCallback(async () => {
    try {
      await deleteUser();
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o usuário.',
      });
    }
  }, [deleteUser]);

  return {
    errors,
    isLoading,
    wantChangePassword,
    isOpen,
    isDeleteModalOpen: isDeleteUserModalOpen,
    handleDeleteUser,
    handleCloseProfileModal,
    register,
    handleSubmit,
    handleWannaChangePassword,
    handleOpenDeleteModal: handleOpenDeleteUserModal,
    handleCloseDeleteModal: handleCloseDeleteUserModal,
  };
}
