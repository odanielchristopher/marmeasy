// import { randomUUID } from 'node:crypto';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useAuth } from '../../../app/hooks/useAuth';

const loginSchema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório.')
    .email('O e-mail deve ser válido.'),
  password: z
    .string()
    .nonempty('A senha é obrigatória.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface IUseLoginControllerProps {
  authService: {
    signin(data: {
      email: string;
      password: string;
    }): Promise<{ accessToken: string }>;
  };
}

export function useLoginController({ authService }: IUseLoginControllerProps) {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync: login, isPending: isLoading } = useMutation({
    mutationFn: authService.signin,
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await login(data);

      signin(accessToken);
    } catch {
      toast.error('Credenciais inválidas!');
    }
  });

  return {
    errors,
    isLoading,
    register,
    handleSubmit,
  };
}
