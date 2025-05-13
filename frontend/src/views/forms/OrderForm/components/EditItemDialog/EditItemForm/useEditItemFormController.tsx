import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CartItem } from '../../Cart';

const editItemSchema = z.object({
  newPrice: z
    .number()
    .or(z.string().nonempty('O valor é obrigatório'))
    .refine((value) => Number(value) > 0, {
      message: 'O valor do produto deve ser maior que zero',
    }),
});

type EditItemFormData = z.infer<typeof editItemSchema>;

export function useEditItemFormController(
  item: CartItem,
  onSubmit: (newItem: CartItem) => void,
) {
  const {
    formState: { errors },
    ...form
  } = useForm<EditItemFormData>({
    defaultValues: {
      newPrice: item.unitPrice,
    },
    resolver: zodResolver(editItemSchema),
  });

  const handleSubmit = form.handleSubmit((formData) => {
    onSubmit({ ...item, unitPrice: Number(formData.newPrice) });
  });

  return {
    errors,
    form,
    handleSubmit,
  };
}
