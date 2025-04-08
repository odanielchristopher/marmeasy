import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { sleep } from '@app/utils/sleep';

export const userSchema = z.object({
  name: z.string().nonempty({ message: 'Nome é obrigatório' }),
  cep: z.string().nonempty({ message: 'CEP é obrigatório' }),
  address: z.string().nonempty({ message: 'Endereço é obrigatório' }),
});

export type UserFormData = z.infer<typeof userSchema>;

export function useCreateUserController() {
  const form = useForm<UserFormData>({
    defaultValues: async () => {
      await sleep(2000);

      return {
        name: 'Daniel',
        cep: '12345678909',
        address: 'Fortaleza',
      };
    },
    resolver: zodResolver(userSchema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log({ userData: data });
    form.reset(data);
  });

  return { form, formState: form.formState, handleSubmit };
}
