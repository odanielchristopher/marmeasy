
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuth } from '@renderer/app/hooks/useAuth';
import toast from '@renderer/app/utils/toast';

import { authService } from '@renderer/app/services/authService';
import { SingUpParams } from '@renderer/app/services/authService/signUp';

const schema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório.').email('Informe um e-mail válido.'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória.')
    .min(6, 'Senha deve conter pelo menos 6 dígitos.'),
});

type FormData = z.infer<typeof schema>

export default function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SingUpParams) => {
      return authService.signIn(data);
    },
    onSuccess: () => {

    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);

      toast({
        type: 'success',
        text: 'Usuário cadastrado com sucesso.',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Credenciais inválidas!',
      });
    }
  });


  // async function handleSubmit({ email, password }) {
  //   try {
  //     await authService.singUp({ email, password });

  //     toast({
  //       type: 'sucess',
  //       text: 'Usuário registrado com sucesso',
  //     });
  //     signin('hash');
  //   } catch {
  //     toast({
  //       type: 'danger',
  //       text: 'Ocorreu um erro ao cadastrar usuário',
  //     });
  //   }
  // }

  return {
    errors,
    isLoading,
    register,
    handleSubmit,
  };
}
