import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Ingredient } from '@renderer/app/entities/Ingredient';
import { Product } from '@renderer/app/entities/Product';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { useWindowWidth } from '@renderer/app/hooks/useWindowWidth';

const schema = z.object({
  id: z.string().uuid(),
  image: z.instanceof(File).optional(),
  name: z.string().min(4, { message: 'O nome deve ter pelo menos 4 caracteres.' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória.' }),
  category: z
    .object(
      {
        id: z.string().uuid(),
        name: z.string(),
        icon: z.string(),
      },
      { required_error: 'Categoria é obrigatória.' },
    )
    .refine((data) => !!data.id, { message: 'Categoria é obrigatória.' }),
  ingredients: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      icon: z.string(),
    }),
  ),
});

type FormData = z.infer<typeof schema>

export default function useEditProductModal(product: Product | null) {
  const imagePath = product?.imagePath ? (
    `${import.meta.env.VITE_API_URL}/${product.imagePath}`
  ) : undefined;

  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(imagePath);
  const [openNewIngredientModal, setOpenNewIngredientModal] = useState(false);

  const width = useWindowWidth();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: product?.id,
      name: product?.name,
      category: product?.category,
      description: product?.description,
      ingredients: product?.ingredients ?? [],
    },
  });

  const selectedCategory = watch('category');
  const selectedIngredients = watch('ingredients');

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
    setValue('category', category, { shouldValidate: true }); // Força a validação ao definir o valor
  }

  function handleSelectedIngredients(ingredient: Ingredient) {
    const currentIngredients = selectedIngredients || []; // Garante que é sempre um array
    const isAlreadySelected = currentIngredients.some((ing) => ing.id === ingredient.id);

    if (isAlreadySelected) {
      // Remove o ingrediente se já estiver selecionado (toggle)
      setValue(
        'ingredients',
        currentIngredients.filter((ing) => ing.id !== ingredient.id),
        { shouldValidate: true },
      );
    } else {
      // Adiciona o ingrediente
      setValue('ingredients', [...currentIngredients, ingredient], { shouldValidate: true });
    }
  }

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log(data);
  });

  return {
    errors,
    width,
    selectedCategory,
    selectedIngredients,
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
