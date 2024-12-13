
import { zodResolver } from '@hookform/resolvers/zod';
import { authService } from '@renderer/app/services/authService';
import { SingUpParams } from '@renderer/app/services/authService/signUp';
import toast from '@renderer/app/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';


const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').min(2, 'Nome deve conter pelo menos 2 caracteres.'),
  email: z.string().min(1, 'E-mail é obrigatório.').email('Informe um e-mail válido.'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória.')
    .min(6, 'Senha deve conter pelo menos 6 dígitos.'),
});

type FormData = z.infer<typeof schema>

export default function useRegisterController() {
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SingUpParams) => {
      return authService.singUp(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);
      toast({
        type: 'success',
        text: 'Conta criada com sucesso.',
      });
      navigateTo('/login');
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
    register,
    handleSubmit,
  };
}
