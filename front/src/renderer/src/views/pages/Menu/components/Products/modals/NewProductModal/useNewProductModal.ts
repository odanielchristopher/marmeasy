import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { queryClient } from '@renderer/App';
import { Ingredient } from '@renderer/app/entities/Ingredient';
import { Product } from '@renderer/app/entities/Product';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { useWindowWidth } from '@renderer/app/hooks/useWindowWidth';
import { productsService } from '@renderer/app/services/productsService';
import { CreateProductParams } from '@renderer/app/services/productsService/create';
import toast from '@renderer/app/utils/toast';
import { useMutation } from '@tanstack/react-query';

const schema = z.object({
  image: z.instanceof(File, { message: 'A imagem é obrigatória.' }).optional(),
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
  description: z.string().optional(),
  price: z.string({ required_error: 'O valor é obrigatório' }),
  categoryId: z.string({ required_error: 'A categoria é obrigatória.' }).uuid(),
  ingredientsIds: z.array(z.string().uuid()),
});

type FormData = z.infer<typeof schema>

export default function useNewProductModal(onSuccess: () => void) {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(undefined);
  const [openNewIngredientModal, setOpenNewIngredientModal] = useState(false);

  const width = useWindowWidth();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ingredientsIds: [],
    },
  });

  const selectedCategoryId = watch('categoryId');
  const selectedIngredientsIds = watch('ingredientsIds');

  function handleOpenNewIngredientModal() {
    setOpenNewIngredientModal(true);
  }

  function handleCloseNewIngredientModal() {
    setOpenNewIngredientModal(false);
  }

  function handleUploadImage<T extends File>([image]: T[]) {
    setValue('image', image, { shouldValidate: true });
    setPreviewImageUrl(URL.createObjectURL(image));
  }

  function handleSelectedCategory(category: ProductCategory) {
    setValue('categoryId', category.id, { shouldValidate: true }); // Força a validação ao definir o valor
  }

  function handleSelectedIngredients(ingredient: Ingredient) {
    const currentIngredients = selectedIngredientsIds || []; // Garante que é sempre um array
    const isAlreadySelected = currentIngredients.some((ingredientId) => ingredientId === ingredient.id);

    if (isAlreadySelected) {
      // Remove o ingrediente se já estiver selecionado (toggle)
      setValue(
        'ingredientsIds',
        currentIngredients.filter((ingredientId) => ingredientId !== ingredient.id),
        { shouldValidate: true },
      );
    } else {
      // Adiciona o ingrediente
      setValue('ingredientsIds', [...currentIngredients, ingredient.id], { shouldValidate: true });
    }
  }

  const { mutateAsync: createProduct, isPending: isLoading } = useMutation({
    mutationFn: async (data: CreateProductParams) => productsService.create(data),
    onSuccess: (newCategory: Product) => {
      queryClient.setQueryData(
        ['products', 'getAll'],
        (categories: Product[]) => [...categories, newCategory],
      );

      queryClient.invalidateQueries({
        queryKey: ['products', 'getAll'],
        exact: true,
      });
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await createProduct(data);
      toast({
        type: 'success',
        text: 'Produto criado com sucesso.',
      });
      onSuccess();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao tentar criar produto.',
      });
    }

  });

  return {
    errors,
    width,
    control,
    isLoading,
    selectedCategoryId,
    selectedIngredientsIds,
    previewImageUrl,
    openNewIngredientModal,
    register,
    handleSelectedCategory,
    handleSelectedIngredients,
    handleOpenNewIngredientModal,
    handleCloseNewIngredientModal,
    handleUploadImage,
    handleSubmit,
  };
}
