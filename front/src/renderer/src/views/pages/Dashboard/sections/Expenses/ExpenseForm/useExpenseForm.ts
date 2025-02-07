import { zodResolver } from '@hookform/resolvers/zod';
import { Expense, ExpenseType } from '@renderer/app/entities/Expense';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const expenseFormSchema = z.object({
  type: z.enum([
    'TAXES',
    'DELIVERY',
    'EQUIPMENTS',
    'EMPLOYEES',
    'UTENSILS',
    'MEATS',
    'GARRISONS',
    'OTHERS',
  ]),
  date: z.date(),
  value: z
    .number({ required_error: 'O valor é obrigatório.' })
    .min(1, { message: 'O valor deve ser maior que zero.' }),
});

export type ExpenseFormSchema = z.infer<typeof expenseFormSchema>;

interface UseExpenseFormProps {
  expense?: Expense | null;
  onSubmit(data: ExpenseFormSchema): Promise<void>;
  onSuccess?(): void;
}

export default function useExpenseForm({
  expense,
  onSubmit,
  onSuccess,
}: UseExpenseFormProps) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
    setFocus,
    watch,
    setValue,
  } = useForm<ExpenseFormSchema>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      type: expense?.type || 'OTHERS',
      date: expense?.date ? new Date(expense.date) : new Date(),
      value: expense?.value || undefined,
    },
  });

  const selectedType = watch('type');

  function handleSelectedType(type: ExpenseType) {
    setValue('type', type, { shouldValidate: true });
  }

  const handleSubmit = hookFormHandleSubmit((data) => {
    onSubmit(data);
    onSuccess?.();
  });

  const selectOption = [
    {
      value: 'EMPLOYEES',
      label: 'Funcionários',
    },
    {
      value: 'DELIVERY',
      label: 'Entregas',
    },
    {
      value: 'UTENSILS',
      label: 'Utensílios',
    },
    {
      value: 'MEATS',
      label: 'Frios',
    },
    {
      value: 'GARRISONS',
      label: 'Guarnição',
    },
    {
      value: 'TAXES',
      label: 'Impostos',
    },
    {
      value: 'EQUIPMENTS',
      label: 'Equipamentos',
    },
    {
      value: 'OTHERS',
      label: 'Outro',
    },
  ];

  return {
    errors,
    control,
    selectedType,
    selectOption,
    register,
    setFocus,
    handleSelectedType,
    handleSubmit,
  };
}
