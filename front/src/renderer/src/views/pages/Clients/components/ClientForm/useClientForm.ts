import { zodResolver } from '@hookform/resolvers/zod';
import { Client } from '@renderer/app/entities/Client';
import { isCNPJValid } from '@renderer/app/utils/isCNPJValid';
import { isValidCPF } from '@renderer/app/utils/isCPFValid';
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
    .or(z.number({ message: 'Saldo é obrigatório.' }))
    .optional(),
});

export type ClientFormData = z.infer<typeof clientFormSchema>;

interface UseClientFormProps {
  client?: Client | null;
  clientType: 'FISICO' | 'JURIDICO';
  onSubmit(data: ClientFormData): Promise<void>;
}

export default function useClientForm({
  client,
  clientType,
  onSubmit,
}: UseClientFormProps) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
    setFocus,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: client?.name,
      address: client?.address ?? '',
      cpf: (clientType === 'FISICO' ? client?.document : '') ?? '',
      cnpj: (clientType === 'JURIDICO' ? client?.document : '') ?? '',
      phone: client?.phone ?? '',
      balance: client?.balance,
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    await onSubmit(data);
  });

  return {
    errors,
    control,
    setFocus,
    register,
    handleSubmit,
  };
}
