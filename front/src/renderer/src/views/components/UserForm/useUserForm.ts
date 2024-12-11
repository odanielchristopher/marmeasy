import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório.').email('Informe um e-mail válido.'),
  password: z.string().min(1, 'Senha é obrigatória.').min(6, 'Senha deve conter pelo menos 6 dígitos.'),
});

type FormData = z.infer<typeof schema>;

export default function useUserFormController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
   } = useForm<FormData>({
    resolver: zodResolver(schema),
   });

  const handleSubmit = hookFormHandleSubmit(() => {
    console.log('chama a api');
  });

  return {
    handleSubmit,
    register,
    errors,
  };
}
