import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useAuth } from '@app/hooks/useAuth';
import { authService } from '@app/services/authService';

import { RegisterFormData, registerSchema } from './schema';

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
