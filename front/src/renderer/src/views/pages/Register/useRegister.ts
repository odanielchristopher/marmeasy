
import { zodResolver } from '@hookform/resolvers/zod';
import useCreateUserMutation from '@renderer/app/hooks/mutations/useCreateUserMutation';
import { useAuth } from '@renderer/app/hooks/useAuth';
import toast from '@renderer/app/utils/toast';
import { useForm } from 'react-hook-form';
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

export default function useRegister() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { createUser, isLoading } = useCreateUserMutation();

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await createUser(data);

      signin(accessToken);
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
    register,
    handleSubmit,
  };
}
