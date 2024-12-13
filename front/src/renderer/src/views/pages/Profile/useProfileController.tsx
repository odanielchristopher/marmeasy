
import { zodResolver } from '@hookform/resolvers/zod';
import { useModal } from '@renderer/app/hooks/useModal';
import { authService } from '@renderer/app/services/authService';
import { SingUpParams } from '@renderer/app/services/authService/signUp';
import { usersService } from '@renderer/app/services/usersService';
import toast from '@renderer/app/utils/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').min(2, 'Nome deve conter pelo menos 2 caracteres.'),
  email: z.string().min(1, 'E-mail é obrigatório.').email('Informe um e-mail válido.'),
  currentPassword: z.string().min(1, 'Senha atual é obrigatória.'),
  newPassword: z
    .string()
    .min(6, 'A nova senha deve conter pelo menos 6 caracteres.')
    .max(32, 'A nova senha não pode exceder 32 caracteres.'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'As senhas não coincidem.',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>

export default function useProfileController() {
  const { isProfileModalOpen, handleIsProfileModalOpen } = useModal();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { data, isSuccess }= useQuery({
    queryKey: ['users', 'find-me'],
    queryFn: () => usersService.findMe(),
    staleTime: Infinity,
    enabled: isProfileModalOpen,
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SingUpParams) => {
      return authService.singUp(data);
    },
    onSuccess: () => {

    },
  });

  useEffect(() => {
    if (isProfileModalOpen && isSuccess) {
      reset(data);
    }
  }, [data, isProfileModalOpen]);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({ email: data.email, password: data.newPassword });
      toast({
        type: 'success',
        text: 'Conta criada com sucesso.',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao criar a sua conta.',
      });
    }
  });

  return {
    errors,
    isLoading,
    isProfileModalOpen,
    register,
    handleSubmit,
    handleIsProfileModalOpen,
  };
}
