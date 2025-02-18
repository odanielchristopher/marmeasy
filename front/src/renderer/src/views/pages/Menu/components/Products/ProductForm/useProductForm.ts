import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Ingredient } from '@renderer/app/entities/Ingredient';
import { Product } from '@renderer/app/entities/Product';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { useWindowWidth } from '@renderer/app/hooks/useWindowWidth';

const productSchema = z.object({
  image: z.instanceof(File).optional(),
  name: z
    .string()
    .min(1, { message: 'O nome deve ter pelo menos 1 caracter.' }),
  description: z.string().optional(),
  price: z.string({ required_error: 'O valor é obrigatório' }),
  categoryId: z.string().optional(),
  ingredientsIds: z.array(z.string()),
});

export type FormData = z.infer<typeof productSchema>;

export type ProductFormData = FormData & {
  removeImage: boolean;
};

interface UseProductFormProps {
  product?: Product | null;
  onSubmit(data: ProductFormData): Promise<void>;
  onSuccess?(): void;
}

export default function useProductForm({
  product,
  onSubmit,
  onSuccess,
}: UseProductFormProps) {
  const imagePath = product?.imagePath
    ? `${import.meta.env.VITE_API_URL}/${product.imagePath}`
    : undefined;

  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(
    imagePath,
  );
  const [removeImage, setRemoveImage] = useState(false);

  const width = useWindowWidth();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? '',
      price: product?.price.toString(),
      description: product?.description ?? '',
      categoryId: product?.category?.id ?? '',
      ingredientsIds:
        product?.ingredients?.map((ingredient) => ingredient.id) ?? [],
    },
  });

  const selectedCategoryId = watch('categoryId');
  const selectedIngredientsIds = watch('ingredientsIds');

  function handleAddUploadImage<T extends File>([image]: T[]) {
    setValue('image', image);
    setPreviewImageUrl(URL.createObjectURL(image));
  }

  function handleRemoveUploadImage() {
    setValue('image', undefined);
    setPreviewImageUrl(undefined);
    setRemoveImage(true);
  }

  function handleSelectedCategory(category: ProductCategory) {
    if (category.id === selectedCategoryId) {
      setValue('categoryId', undefined, { shouldValidate: true }); // Força a validação ao definir o valor
    } else {
      setValue('categoryId', category.id, { shouldValidate: true }); // Força a validação ao definir o valor
    }
  }

  function handleSelectedIngredients(ingredient: Ingredient) {
    const currentIngredients = selectedIngredientsIds || []; // Garante que é sempre um array
    const isAlreadySelected = currentIngredients.some(
      (ingredientId) => ingredientId === ingredient.id,
    );

    if (isAlreadySelected) {
      // Remove o ingrediente se já estiver selecionado (toggle)
      setValue(
        'ingredientsIds',
        currentIngredients.filter(
          (ingredientId) => ingredientId !== ingredient.id,
        ),
        { shouldValidate: true },
      );
    } else {
      // Adiciona o ingrediente
      setValue('ingredientsIds', [...currentIngredients, ingredient.id], {
        shouldValidate: true,
      });
    }
  }

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    await onSubmit({
      ...data,
      removeImage,
    });
    onSuccess?.();
  });

  return {
    errors,
    width,
    control,
    selectedCategoryId,
    selectedIngredientsIds,
    previewImageUrl,
    register,
    handleSelectedCategory,
    handleSelectedIngredients,
    handleAddUploadImage,
    handleRemoveUploadImage,
    handleSubmit,
  };
}
