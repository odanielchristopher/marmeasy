// import { randomUUID } from 'node:crypto';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useAuth } from '../../../app/hooks/useAuth';

import { LoginFormData, loginSchema } from './schema';

interface IUseLoginController {
  authService: {
    signin(data: {
      email: string;
      password: string;
    }): Promise<{ accessToken: string }>;
  };
}

export function useLoginController({ authService }: IUseLoginController) {
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
