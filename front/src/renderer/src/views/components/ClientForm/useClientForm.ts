import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@renderer/App';
import { Client } from '@renderer/app/entities/Client';
import { clientsService } from '@renderer/app/services/clientsService';
import { UpdateClientParams } from '@renderer/app/services/clientsService/update';
import { isValidCPF } from '@renderer/app/utils/isCPFValid';
import toast from '@renderer/app/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const clientFormSchema = z.object({
  name: z
    .string({ required_error: 'O nome do cliente é obrigatório.' })
    .min(2, 'O nome do cliente é obrigatório'),
  phone: z.string().optional(),
  address: z.string().optional(),
  cpf: z
    .string()
    .optional()
    .refine((value) => !value || isValidCPF(value), {
      message: 'O CPF precisa ser válido ou estar vazio',
    }),
});

export type FormData = z.infer<typeof clientFormSchema>

export default function useClientForm(isShow: boolean, client: Client | null, onConfirm: () => void) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(clientFormSchema),
  });

  const { mutateAsync: updateClient, isPending: isLoading } = useMutation({
    mutationFn: async (data: UpdateClientParams) => clientsService.update(data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['clients', 'getAll'],
        type: 'active',
        exact: true,
      });
    },
  });

  useEffect(() => {
    if (isShow && client) {
      reset({
        name: client.name,
        address: client.address ?? '',
        cpf: client.document ?? '',
        phone: client.phone ?? '',
      });
    } else if (!isShow) {
      reset();
    }

    return () => {
      reset();
    };
  }, [isShow, client]);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateClient({
        ...data,
        id: client!.id,
        type: client!.type,
      });

      toast({
        type: 'success',
        text: 'Cliente editado com sucesso.',
      });

      onConfirm();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o cliente!',
      });
    }
  });

  return {
    errors,
    register,
    control,
    isLoading,
    handleSubmit,
  };
}
