import { zodResolver } from '@hookform/resolvers/zod';
import { Ingredient } from '@renderer/app/entities/Ingredient';
import { Order } from '@renderer/app/entities/Order';
import { Product } from '@renderer/app/entities/Product';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { useProductCategoriesQuery } from '@renderer/app/hooks/queries/useProductCategoriesQuery';
import { useProductsQuery } from '@renderer/app/hooks/queries/useProductsQuery';
import { ordersService } from '@renderer/app/services/ordersService';
import { CreateOrderParams } from '@renderer/app/services/ordersService/create';
import toast from '@renderer/app/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface OrderDetail {
  selectedIngredients: Ingredient[];
  quantity: number;
  productName: string;
  productImage: string;
  productPrice: number;
  totalPrice: number;
  categoryId: string;
}

export const orderFormSchema = z.object({
  date: z.date(),
  discount: z.number(),
  items: z.array(
    z.object({
      name: z.string(),
      ingredients: z.array(z.string()),
      unitPrice: z.number(),
      quantity: z.number(),
      total: z.number(),
    }),
  ),
  totalValue: z.number(),
});

export type OrderFormSchema = z.infer<typeof orderFormSchema>;

export default function useOrderModal(isOpen: boolean, clientId: string | null, onSuccess: () => void) {
  const { setValue, handleSubmit:hookFormHandleSubmit } = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
  });
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
    const currentIngredients =  selectedProduct?.ingredients || [];
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

  // const handleIngredientsSubmit = (data: CreateOrderParams) => {
  //   const orderDetail: OrderDetail = {
  //     selectedIngredients: [],
  //     quantity: data.items.length,
  //     productName: data.items.,
  //     productImage: '',
  //     productPrice: data.
  //     totalPrice: data.items.,
  //     categoryId: '',
  //   };
  //   setOrderDetails((prevOrderDetails) => [...prevOrderDetails, orderDetail]);
  //   handleCloseIngredientModal();
  // };

  const { mutateAsync: createOrder, isPending: isLoading } = useMutation({
    mutationFn: async (data: CreateOrderParams) =>
      ordersService.create(data),
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
