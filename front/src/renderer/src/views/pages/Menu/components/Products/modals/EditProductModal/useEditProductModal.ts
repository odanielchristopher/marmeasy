import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { queryClient } from '@renderer/App';
import { Ingredient } from '@renderer/app/entities/Ingredient';
import { Product } from '@renderer/app/entities/Product';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { useWindowWidth } from '@renderer/app/hooks/useWindowWidth';
import { productsService } from '@renderer/app/services/productsService';
import { UpdateProductParams } from '@renderer/app/services/productsService/update';
import toast from '@renderer/app/utils/toast';

const schema = z.object({
  id: z.string().uuid(),
  image: z.instanceof(File).optional(),
  name: z
    .string()
    .min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
  description: z.string().optional(),
  price: z.string({ required_error: 'O valor é obrigatório' }),
  categoryId: z.string().optional(),
  ingredientsIds: z.array(z.string()),
});

type FormData = z.infer<typeof schema>;

export default function useEditProductModal(
  product: Product | null,
  onSuccess: () => void,
) {
  const imagePath = product?.imagePath
    ? `${import.meta.env.VITE_API_URL}/${product.imagePath}`
    : undefined;

  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(
    imagePath,
  );
  const [openNewIngredientModal, setOpenNewIngredientModal] = useState(false);
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
    resolver: zodResolver(schema),
    defaultValues: {
      id: product?.id,
      name: product?.name ?? '',
      price: product?.price.toString(),
      description: product?.description ?? '',
      categoryId: product?.category?.id ?? '',
      ingredientsIds: product?.ingredients.map((ingredient) => ingredient.id) ?? [],
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

  const { mutateAsync: updateProduct, isPending: isLoading } = useMutation({
    mutationFn: async (data: UpdateProductParams) =>
      productsService.update(data),
    onSuccess: (updatedProduct: Product) => {
      queryClient.setQueryData(
        ['products', 'getAll'],
        (currentProducts: Product[]) => {
          return currentProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product,
          );
        },
      );
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateProduct({
        ...data,
        removeImage,
      });
      toast({
        type: 'success',
        text: 'Produto editado com sucesso.',
      });
      onSuccess();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um error ao editar o produto.',
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
    handleAddUploadImage,
    handleRemoveUploadImage,
    handleSubmit,
  };
}
