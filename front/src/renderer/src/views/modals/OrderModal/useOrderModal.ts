import { Ingredient } from '@renderer/app/entities/Ingredient';
import { Order } from '@renderer/app/entities/Order';
import { Product } from '@renderer/app/entities/Product';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { useProductCategoriesQuery } from '@renderer/app/hooks/queries/useProductCategoriesQuery';
import { useProductsQuery } from '@renderer/app/hooks/queries/useProductsQuery';
import { ordersService } from '@renderer/app/services/ordersService';
import toast from '@renderer/app/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface OrderDetail {
  selectedIngredients: Ingredient[];
  quantity: number;
  productName: string;
  productImage: string;
  productPrice: number;
  totalPrice: number;
  categoryId: string;
}

export default function useOrderModal(isOpen: boolean, clientId: string | null, onSuccess: () => void) {
  const { watch, setValue, handleSubmit:hookFormHandleSubmit } = useForm();
  const queryClient = useQueryClient();

  const { categories, isLoading: isLoadingCategories } =
    useProductCategoriesQuery();
  const { products, isLoading: isLoadingProducts } = useProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();
  const [orderDate, setOrderDate] = useState<string>('');
  const [openModalIngredients, setOpenModalIngredients] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(isOpen);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

  const selectedIngredientsIds = watch('ingredientsIds');

  function handleCategorySelect(category: ProductCategory) {
    setSelectedCategory(category);
  }

  function handleOrderDateChange(date: string) {
    setOrderDate(date);
  }

  function handleOpenModalIngredients(product: Product) {
    setSelectedProduct(product);
    setOpenModalIngredients(true);
  }

  function handleCloseModalIngredients() {
    setOpenModalIngredients(false);
    setSelectedProduct(null);
  }

  function handleSelectedIngredients(ingredient: Ingredient) {
    const currentIngredients = selectedIngredientsIds || [];
    setValue('ingredientsIds', [...currentIngredients, ingredient.id], {
      shouldValidate: true,
    });
  }

  useEffect(() => {
    setIsOrderModalOpen(isOpen);
  }, [isOpen]);

  const handleOpenIngredientModal = (product: Product) => {
    handleOpenModalIngredients(product);
    setIsOrderModalOpen(false);
  };

  const handleCloseIngredientModal = () => {
    handleCloseModalIngredients();
    setIsOrderModalOpen(true);
  };

  const handleIngredientsSubmit = (data: OrderDetail) => {
    setOrderDetails((prevOrderDetails) => [...prevOrderDetails, data]);
    handleCloseIngredientModal();
  };

  const { mutateAsync: createOrder, isPending: isLoading } = useMutation({
    mutationFn: async (data: Order) =>
      ordersService.createByClientId(data),
    onSuccess: (newOrder: Order) => {
      queryClient.setQueryData(
        ['orders', 'getAll'],
        (orders: Order[]) => [...orders, newOrder],
      );
    },
  });

  const handleOrderSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await createOrder(data);
      toast({
        type: 'success',
        text: 'Pedido criado com sucesso.',
      });
      onSuccess();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao tentar criar pedido.',
      });
    }
  });

  return {
    categories,
    products,
    isLoadingCategories,
    isLoadingProducts,
    isLoading,
    isOrderModalOpen,
    selectedCategory,
    selectedIngredientsIds,
    orderDate,
    orderDetails,
    openModalIngredients,
    selectedProduct,
    handleCategorySelect,
    handleOrderDateChange,
    handleOpenModalIngredients,
    handleCloseModalIngredients,
    handleSelectedIngredients,
    handleOpenIngredientModal,
    handleCloseIngredientModal,
    handleIngredientsSubmit,
    handleOrderSubmit,
  };
}
