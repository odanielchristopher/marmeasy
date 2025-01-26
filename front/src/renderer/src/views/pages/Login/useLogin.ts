import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuth } from '@renderer/app/hooks/useAuth';
import toast from '@renderer/app/utils/toast';

import { authService } from '@renderer/app/services/authService';
import { SingInParams } from '@renderer/app/services/authService/singIn';

const schema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório.')
    .email('Informe um e-mail válido.'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória.')
    .min(6, 'Senha deve conter pelo menos 6 dígitos.'),
});

type FormData = z.infer<typeof schema>;

export default function useLogin() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { signin } = useAuth();

  const { mutateAsync: login, isPending: isLoading } = useMutation({
    mutationFn: async (data: SingInParams) => {
      return authService.signIn(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await login(data);

      signin(accessToken);

      toast({
        type: 'success',
        text: 'Usuário autenticado.',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          type: 'danger',
          text:
            error.response?.data.message ?? 'Ocorreu um erro ao fazer o login.',
        });
      } else {
        toast({
          type: 'danger',
          text: 'Erro desconhecido',
        });
      }
    }
  });

  return {
    errors,
    isLoading,
    register,
    handleSubmit,
  };
}
