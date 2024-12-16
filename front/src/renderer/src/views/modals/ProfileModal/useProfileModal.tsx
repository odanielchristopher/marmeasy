import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import useDeleteUserMutation from '@renderer/app/hooks/mutations/useDelteUserMutation';
import useEditUserMutation from '@renderer/app/hooks/mutations/useEditUserMutation';
import useFindMeQuery from '@renderer/app/hooks/queries/useFindMeQuery';
import { useModals } from '@renderer/app/hooks/useModals';
import toast from '@renderer/app/utils/toast';

const schema = z
  .object({
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .min(2, 'Nome deve conter pelo menos 2 caracteres.'),
    email: z.string().min(1, 'E-mail é obrigatório.').email('Informe um e-mail válido.'),
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

type FormData = z.infer<typeof schema>

export default function useProfileController() {
  const [wantChangePassword, setWantChangePassword] = useState(false);

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
  const { editUser, isLoading } = useEditUserMutation();
  const { deleteUser } = useDeleteUserMutation();

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
        text: 'Seus dados foram editados.',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar seus dados.',
      });
    }
  });

  const handleDeleteUser = useCallback(async () => {
    await deleteUser();
  }, []);

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
