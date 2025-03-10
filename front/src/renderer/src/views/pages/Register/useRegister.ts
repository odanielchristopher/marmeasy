import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { authService } from '@renderer/app/services/authService';
import { SingUpParams } from '@renderer/app/services/authService/signUp';

import { useAuth } from '@renderer/app/hooks/useAuth';
import toast from '@renderer/app/utils/toast';
import { AxiosError } from 'axios';

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
    password: z
      .string()
      .min(1, 'Senha é obrigatória.')
      .min(6, 'Senha deve conter pelo menos 6 dígitos.'),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (!confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Confirme a sua senha.',
        path: ['confirmPassword'],
      });
    } else if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas não estão iguais.',
        path: ['confirmPassword'],
      });
    }
  });

type FormData = z.infer<typeof schema>;

export default function useRegister() {
  const { signin } = useAuth();
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: createUser, isPending: isLoading } = useMutation({
    mutationFn: async (data: SingUpParams) => {
      return authService.singUp(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await createUser(data);

      signin(accessToken);
      toast({
        type: 'success',
        text: 'Conta criada com sucesso.',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          type: 'danger',
          text:
            error.response?.data.message ?? 'Ocorreu um erro ao fazer o login.',
        });
        return;
      }

      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao criar sua conta',
      });
    }
  });

  return {
    errors,
    isLoading,
    register,
    handleSubmit,
  };
}
