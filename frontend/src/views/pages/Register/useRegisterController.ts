import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useAuth } from '@app/hooks/useAuth';
import { authService } from '@app/services/authService';

const registerSchema = z.object({
  name: z
    .string()
    .nonempty('O nome é obrigatório.')
    .min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório.')
    .email('O e-mail deve ser válido.'),
  password: z
    .string()
    .nonempty('A senha é obrigatória.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync: signup, isPending: isLoading } = useMutation({
    mutationFn: authService.signup,
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await signup(data);

      signin(accessToken);
    } catch {
      toast.error('Ocorreu um erro ao cria a sua conta!');
    }
  });

  return {
    errors,
    isLoading,
    register,
    handleSubmit,
  };
}
