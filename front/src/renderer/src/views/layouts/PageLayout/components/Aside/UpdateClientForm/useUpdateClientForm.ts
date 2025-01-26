import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@renderer/App';
import { Client } from '@renderer/app/entities/Client';
import { clientsService } from '@renderer/app/services/clientsService';
import { UpdateClientParams } from '@renderer/app/services/clientsService/update';
import { isCNPJValid } from '@renderer/app/utils/isCNPJValid';
import { isValidCPF } from '@renderer/app/utils/isCPFValid';
import toast from '@renderer/app/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const clientFormSchema = z.object({
  name: z
    .string({ required_error: 'O nome do cliente é obrigatório.' })
    .min(2, 'O nome do cliente é obrigatório'),
  phone: z
    .string()
    .optional()
    .refine((value) => !value || value.length === 11, {
      message: 'O telefone precisa ter 11 digitos ou estar vazio',
    }),
  address: z.string().optional(),
  cpf: z
    .string()
    .optional()
    .refine((value) => !value || isValidCPF(value), {
      message: 'O CPF precisa ser válido ou estar vazio',
    }),
  cnpj: z
    .string()
    .optional()
    .refine((value) => !value || isCNPJValid(value), {
      message: 'O CNPJ precisa ser válido ou estar vazio',
    }),
  balance: z
    .string({ required_error: 'Saldo é obrigatório' })
    .min(1, 'Saldo é obrigatório'),
});

export type FormData = z.infer<typeof clientFormSchema>;

export default function useUpdateClientForm(
  isShow: boolean,
  clientBeingUpdated: Client | null,
) {
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
    onSuccess: (updatedClient) => {
      queryClient.setQueryData(['clients', 'getAll'], (clients: Client[]) =>
        clients.map((client) =>
          client.id === updatedClient.id ? updatedClient : client,
        ),
      );
    },
  });

  useEffect(() => {
    if (isShow && clientBeingUpdated) {
      reset({
        name: clientBeingUpdated.name,
        address: clientBeingUpdated.address ?? '',
        cpf:
          (clientBeingUpdated.type === 'FISICO'
            ? clientBeingUpdated.document
            : '') ?? '',
        cnpj:
          (clientBeingUpdated.type === 'JURIDICO'
            ? clientBeingUpdated.document
            : '') ?? '',
        phone: clientBeingUpdated.phone ?? '',
        balance: String(clientBeingUpdated.balance),
      });
    } else if (!isShow) {
      reset();
    }

    return () => {
      reset();
    };
  }, [isShow, clientBeingUpdated]);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const { name, address, phone, cnpj, cpf, balance } = data;

    try {
      await updateClient({
        id: clientBeingUpdated!.id,
        type: clientBeingUpdated!.type,
        name,
        address: address || undefined,
        phone: phone || undefined,
        document:
          clientBeingUpdated!.type === 'FISICO'
            ? cpf || undefined
            : cnpj || undefined,
        balance,
      });

      toast({
        type: 'success',
        text: 'Cliente editado com sucesso.',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          type: 'danger',
          text: error.response?.data.message,
        });

        return;
      }

      toast({
        type: 'danger',
        text: 'Ocorreu um erro cadastrar o cliente!',
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
