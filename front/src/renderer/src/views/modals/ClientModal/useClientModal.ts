import { zodResolver } from '@hookform/resolvers/zod';
import toast from '@renderer/app/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const clientFormSchema = z.object({
  name: z.string().min(2, 'O nome do cliente é um campo obrigatório'),
  phone: z.string().optional(),
  address: z.string().optional(),
  number: z.string().optional(),
  district: z.string().optional(),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
});

type FormData = z.infer<typeof clientFormSchema>;

export default function useClientModal(isOpen: boolean) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(clientFormSchema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: FormData) => console.log({data}),
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [isOpen]);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);
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

  return {
    errors,
    register,
    isLoading,
    handleSubmit,
  };
}
