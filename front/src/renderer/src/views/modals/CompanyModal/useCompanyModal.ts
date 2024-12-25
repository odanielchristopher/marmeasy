import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@renderer/App';
import { Client } from '@renderer/app/entities/Client';
import { clientsService } from '@renderer/app/services/clientsService';
import { CreateClientParams } from '@renderer/app/services/clientsService/create';
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
  cnpj: z.string().optional().refine(value => !value || isCNPJValid(value), {
    message: 'O CNPJ precisa ser válido ou estar vazio',
  }),
  initialBalance: z.string({ required_error: 'Saldo é obrigatório' }).min(1, 'Saldo é obrigatório'),
});

type FormData = z.infer<typeof clientFormSchema>

export default function useCompanyModal(isOpen: boolean, closeModal: () => void) {
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

  const { mutateAsync: createCompany, isPending: isLoading } = useMutation({
    mutationFn: async (data: CreateClientParams) => clientsService.create({
      ...data,
    }),
    onSuccess: (newData) => {
      queryClient.setQueryData(['clients', 'getAll'], (oldData: Client[]) => ([
        ...oldData,
        newData,
      ]));

      queryClient.invalidateQueries({
        queryKey: ['clients', 'getAll'],
        exact: true,
      });
    },
  });;

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await createCompany({
        ...data,
        type: 'JURIDICO',
        document: data.cnpj,
      });

      toast({
        type: 'success',
        text: 'Empresa cadastrada com sucesso',
      });
      closeModal();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar empresa',
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
