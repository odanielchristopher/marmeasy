import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Ingredient } from '@renderer/app/entities/Ingredient';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { useWindowWidth } from '@renderer/app/hooks/useWindowWidth';

const schema = z.object({
  image: z.instanceof(File).optional(),
  name: z.string().min(4, { message: 'O nome deve ter pelo menos 4 caracteres.' }),
  description: z.string().min(1, { message: 'A descrição é obrigatória.' }),
  price: z.string({ required_error: 'O valor é obrigatório' }),
  categoryId: z.string().uuid(),
  ingredientsIds: z.array(z.string().uuid()),
});

type FormData = z.infer<typeof schema>

export default function useNewProductModal() {
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
    setValue('image', image);
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

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log(data);

  });

  return {
    errors,
    width,
    control,
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
