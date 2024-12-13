
import { zodResolver } from '@hookform/resolvers/zod';
import { authService } from '@renderer/app/services/authService';
import { SingUpParams } from '@renderer/app/services/authService/signUp';
import { usersService } from '@renderer/app/services/usersService';
import toast from '@renderer/app/utils/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').min(2, 'Nome deve conter pelo menos 2 caracteres.'),
  email: z.string().min(1, 'E-mail é obrigatório.').email('Informe um e-mail válido.'),
  currentPassword: z.string().min(1, 'Senha atual é obrigatória.'),
  newPassword: z
    .string()
    .min(6, 'A nova senha deve conter pelo menos 6 caracteres.')
    .or(z.optional(z.string())),
  confirmPassword: z.string(),
}).refine((data) => {
  // Valida somente se "newPassword" estiver preenchida
  if (data.newPassword && data.newPassword.length > 0) {
    return data.newPassword === data.confirmPassword;
  }
  return true; // Validação passa se "newPassword" estiver vazia ou ausente
}, {
  message: 'As senhas não coincidem.',
  path: ['confirmPassword'], // Indica onde o erro ocorre
});

type FormData = z.infer<typeof schema>

export default function useProfileController(open) {
  const [ wantChangePassword,  setWantChangePassword] = useState(false);

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
    enabled: open,
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SingUpParams) => {
      return authService.singUp(data);
    },
  });

  useEffect(() => {
    if (open && isSuccess) {
      reset(data);
    }
  }, [data, open]);

  function handleWannaChangePassword() {
    setWantChangePassword((prevState) => !prevState);
  }

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      setWantChangePassword(false);
      await mutateAsync({ email: data.email, password: data.currentPassword });
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
    wantChangePassword,
    register,
    handleSubmit,
    handleWannaChangePassword,
  };
}
