import { zodResolver } from '@hookform/resolvers/zod';
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
import { OrderDetail } from '../../Items/ItemForm/useItemForm';

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

export default function useOrderModal(isOpen: boolean, onSuccess: () => void) { //clientId também
  const { handleSubmit:hookFormHandleSubmit } = useForm<OrderFormSchema>({
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsOrderModalOpen(isOpen);
  }, [isOpen]);

  function handleCategorySelect(category: ProductCategory) {
    setSelectedCategory(category);
  }

  function handleOrderDateChange(date: string) {
    setOrderDate(date);
  }

  function handleOpenIngredientModal(product: Product) {
    setSelectedProduct(product);
    setOpenModalIngredients(true);
    setIsDeleteModalOpen(false);
    setIsOrderModalOpen(false);
  };

  function handleCloseIngredientModal() {
    setOpenModalIngredients(false);
    setIsOrderModalOpen(true);
  };

  function handleOpenEditModal(index: number) {
    setEditIndex(index);
    setIsEditModalOpen(true);
    setIsOrderModalOpen(false);
  };

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setIsOrderModalOpen(true);
  }

  function handleOpenDeleteModal(index: number) {
    setEditIndex(index);
    setIsDeleteModalOpen(true);
    setIsOrderModalOpen(false);
  };

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
    setIsOrderModalOpen(true);
  }

  function addProductToOrder(details: OrderDetail) {
    setOrderDetails((prevDetails) => [...prevDetails, details]);
  }

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
    openModalIngredients,
    selectedProduct,
    setOrderDetails,
    handleCategorySelect,
    handleOrderDateChange,
    handleOpenIngredientModal,
    handleCloseIngredientModal,
    handleOrderSubmit,
    handleOpenEditModal,
    handleOpenDeleteModal,
    handleCloseEditModal,
    handleCloseDeleteModal,
    orderDetails,
    addProductToOrder,
    isEditModalOpen,
    isDeleteModalOpen,
    editIndex,
  };
}
