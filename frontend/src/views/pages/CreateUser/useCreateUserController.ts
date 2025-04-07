import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().nonempty({ message: 'Nome é obrigatório' }),
  cep: z.string().nonempty({ message: 'CEP é obrigatório' }),
  address: z.string().nonempty({ message: 'Endereço é obrigatório' }),
});

type UserFormData = z.infer<typeof userSchema>;

export function useCreateUserController() {
  const form = useForm<UserFormData>({
    defaultValues: {
      name: '',
      cep: '',
      address: '',
    },
    resolver: zodResolver(userSchema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log({ userData: data });
    form.reset();
  });

  return { form, formState: form.formState, handleSubmit };
}
