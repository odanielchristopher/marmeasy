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
import { OrderDetail } from '../IngredientsModal/useIngredientsModal';

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

  useEffect(() => {
    setIsOrderModalOpen(isOpen);
  }, [isOpen]);

  function handleOpenIngredientModal(product: Product) {
    handleOpenModalIngredients(product);
    setIsOrderModalOpen(false);
  };

  function handleCloseIngredientModal() {
    handleCloseModalIngredients();
    setIsOrderModalOpen(true);
  };

  function handleOpenEditModal(index: number) {
    setEditIndex(index);
    setIsEditModalOpen(true);
  };

  function handleOpenDeleteModal(index: number) {
    setEditIndex(index);
    setIsDeleteModalOpen(false);
  };

  function handleConfimEdit(OrderDetailsUpdated: OrderDetail) {
    {editIndex !== null && editOrderDetail(editIndex, OrderDetailsUpdated);}
    setIsEditModalOpen(false);
  }

  function handleConfirmDelete(index: number) {
    {editIndex !== null && deleteOrderDetail(index);}
    setIsDeleteModalOpen(false);
  }

  // funções crud
  function addProductToOrder(details: OrderDetail) {
    setOrderDetails((prevDetails) => [...prevDetails, details]);
  }

  function editOrderDetail(index: number, OrderDetailsUpdated: OrderDetail) {
    setOrderDetails((prevDetails) => {
      return prevDetails.map((detail, i) => (i === index ? OrderDetailsUpdated : detail));
    });
  };

  function deleteOrderDetail(index: number) {
    setOrderDetails((prevDetails) => {
      return prevDetails.filter((_, i) => i !== index);
    });
  };

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
    handleCategorySelect,
    handleOrderDateChange,
    handleOpenModalIngredients,
    handleCloseModalIngredients,
    handleOpenIngredientModal,
    handleCloseIngredientModal,
    handleOrderSubmit,
    handleOpenEditModal,
    handleOpenDeleteModal,
    handleConfimEdit,
    handleConfirmDelete,
    orderDetails,
    addProductToOrder,
    editOrderDetail,
    deleteOrderDetail,
    isEditModalOpen,
    isDeleteModalOpen,
    editIndex,
  };
}
