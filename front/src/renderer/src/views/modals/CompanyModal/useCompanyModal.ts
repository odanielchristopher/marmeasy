import { zodResolver } from '@hookform/resolvers/zod';
import { isCNPJValid } from '@renderer/app/utils/isCNPJValid';
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
  cnpj: z.string().optional().refine(value => !value || isCNPJValid(value), {
    message: 'O CPF precisa ser válido ou estar vazio',
  }),
});

type FormData = z.infer<typeof clientFormSchema>

export default function useCompanyModal(isOpen: boolean) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(clientFormSchema),
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [isOpen]);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: FormData) => console.log({ data }),
  });

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
    control,
    register,
    isLoading,
    handleSubmit,
  };
}