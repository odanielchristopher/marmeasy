import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@renderer/App';
import { clientsService } from '@renderer/app/services/clientsService';
import { CreateClientParams } from '@renderer/app/services/clientsService/create';
import { isValidCPF } from '@renderer/app/utils/isCPFValid';
import toast from '@renderer/app/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const clientFormSchema = z.object({
  name: z.string({ required_error: 'O nome do cliente é obrigatório.' }).min(2, 'O nome do cliente é obrigatório'),
  phone: z.string().optional(),
  address: z.string().optional(),
  cpf: z.string().optional().refine(value => !value || isValidCPF(value), {
    message: 'O CPF precisa ser válido ou estar vazio',
  }),
});

export type FormData = z.infer<typeof clientFormSchema>;

export default function useClientModal(isOpen: boolean, closeModal: () => void) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(clientFormSchema),
  });

  const { mutateAsync: createClient, isPending: isLoading } = useMutation({
    mutationFn: async (data: CreateClientParams) => clientsService.create({
      ...data,
    }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['clients', 'getAll'],
        type: 'active',
        exact: true,
      });
    },
  });;

  useEffect(() => {
    return () => {
      reset();
    };
  }, [isOpen]);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await createClient({
        ...data,
        type: 'FISICO',
        document: data.cpf,
      });

      toast({
        type: 'success',
        text: 'Cliente cadastrado com sucesso.',
      });

      closeModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);

        toast({
          type: 'danger',
          text: 'Dados inválidos.',
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
