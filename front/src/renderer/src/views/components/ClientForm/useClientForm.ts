import { zodResolver } from '@hookform/resolvers/zod';
import useCreateClient from '@renderer/app/hooks/mutations/useCreateClient';
import { isValidCPF } from '@renderer/app/utils/isCPFValid';
import toast from '@renderer/app/utils/toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const clientFormSchema = z.object({
  name: z.string({ required_error: 'O nome do cliente é obrigatório.' }).min(2, 'O nome do cliente é obrigatório'),
  phone: z.string().optional(),
  address: z.string().optional(),
  number: z.string().optional(),
  district: z.string().optional(),
  cpf: z.string().optional().refine(value => !value || isValidCPF(value), {
    message: 'O CPF precisa ser válido ou estar vazio',
  }),
});

export type FormData = z.infer<typeof clientFormSchema>;

export default function useClientForm(isShow: boolean) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(clientFormSchema),
  });

  console.log(isShow);

  const { createClient, isLoading } = useCreateClient();

  // const { data } =useQuery({
  //   queryKey: ['/clients', 'getOne'],
  //   queryFn: async () => {
  //     return clientsService.getOne({id: 'asd'});
  //   },
  //   enabled: isShow,
  // });

  // useEffect(() => {
  //   if (isShow) {
  //     reset(data);
  //   }
  // }, [isShow, data]);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await createClient({
        ...data,
        type: 'FISICO',
      });

      toast({
        type: 'success',
        text: 'Usuário cadastrado com sucesso.',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro!',
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
