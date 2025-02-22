import { zodResolver } from '@hookform/resolvers/zod';
import { InfiniteData, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Product } from '@renderer/app/entities/Product';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';

import { useClientsQuery } from '@renderer/app/hooks/queries/useClientsQuery';
import { useProductCategoriesQuery } from '@renderer/app/hooks/queries/useProductCategoriesQuery';
import { useProductsQuery } from '@renderer/app/hooks/queries/useProductsQuery';

import { queryClient } from '@renderer/App';
import { Client } from '@renderer/app/entities/Client';
import { clientsService } from '@renderer/app/services/clientsService';
import { ordersService } from '@renderer/app/services/ordersService';
import { PaginatedResponse } from '@renderer/app/services/types';
import toast from '@renderer/app/utils/toast';
import { OrderDetail } from '../../../../../../pages/Orders/components/Items/ItemForm/useItemForm';

export const orderFormSchema = z.object({
  clientName: z.string().min(1, 'O nome do cliente é obrigatório'),
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
  ).min(0, 'O pedido deve conter pelo menos um item'),
  totalValue: z.number(),
});

export type OrderFormSchema = z.infer<typeof orderFormSchema>;

export default function useOrderModal(isOpen: boolean, onClose: () => void) {
  const { categories, isLoading: isLoadingCategories } =
    useProductCategoriesQuery();
  const { products } = useProductsQuery();
  const { clients } = useClientsQuery();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(isOpen);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState(false);

  const [index, setIndex] = useState<number | null>(null);

  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

  const [product, setProduct] = useState<Product | null>(null);

  const {
    formState: { errors },
    control,
    handleSubmit,
    setError,
  } = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      clientName: '',
      date: new Date(),
      discount: 0,
      items: [],
      totalValue: 0,
    },
  });

  useEffect(() => {
    setIsOrderModalOpen(isOpen);
  }, [isOpen]);

  function handleCategorySelect(category: ProductCategory) {
    setSelectedCategory(category);
  }

  // Item modals
  function handleOpenItemModal(product: Product) {
    setSelectedProduct(product);
    setIsItemModalOpen(true);
    setIsDeleteItemModalOpen(false);
    setIsOrderModalOpen(false);
  }

  function handleCloseItemModal() {
    setIsItemModalOpen(false);
    setIsOrderModalOpen(true);
  }

  // actions item modals
  function handleOpenEditItemModal(index: number) {
    setIndex(index);
    const productToEdit = products.find(
      (p) => p.name === orderDetails[index].productName,
    );
    setProduct(productToEdit ?? null);
    setIsEditItemModalOpen(true);
    setIsOrderModalOpen(false);
  }

  function handleCloseEditItemModal() {
    setIsEditItemModalOpen(false);
    setIsOrderModalOpen(true);
  }

  function handleOpenDeleteItemModal(index: number) {
    setIndex(index);
    setIsDeleteItemModalOpen(true);
    setIsOrderModalOpen(false);
  }

  function handleCloseDeleteItemModal() {
    setIsDeleteItemModalOpen(false);
    setIsOrderModalOpen(true);
  }

  function addProductToOrder(details: OrderDetail, product: Product) {
    setOrderDetails((prevDetails) => [...prevDetails, details]);
    setProduct(product);
  }

  function findClientByName(name: string) {
    return clients.find((client) => client.name === name);
  }

  const { mutateAsync: createOrder, isPending: isLoading } = useMutation({
    mutationFn: async (data: OrderFormSchema) => {
      const client = findClientByName(data.clientName);
      if (!client) {
        throw new Error('Client not found');
      }
      const orderData = {
        ...data,
        clientId: client.id,
        items: orderDetails.map((item) => ({
          name: item.productName,
          ingredients: item.selectedIngredients.map((ingredient) => ingredient.name),
          unitPrice: item.productPrice,
          quantity: item.quantity,
          total: item.totalPrice,
        })),
      };
      return ordersService.create(orderData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      onClose();
    },
  });

  async function onSubmit(data: OrderFormSchema) {
    const client = findClientByName(data.clientName);
    if (!client) {
      setError('clientName', { type: 'manual', message: 'Cliente não encontrado' });
      return;
    }

    if (orderDetails.length === 0) {
      setError('items', { type: 'manual', message: 'O pedido deve conter pelo menos um item' });
      return;
    }

    // Calcular o valor total do pedido
    const totalValue = orderDetails.reduce((total, item) => total + item.totalPrice, 0);

    const orderData = {
      ...data,
      clientId: client.id,
      items: orderDetails.map((item) => ({
        name: item.productName,
        ingredients: item.selectedIngredients.map((ingredient) => ingredient.name),
        unitPrice: item.productPrice,
        quantity: item.quantity,
        total: item.totalPrice,
      })),
      totalValue,
    };

    try {
      await createOrder(orderData);

      const updatedBalance = Number(client.balance ?? 0) - totalValue;
      await clientsService.update({
        id: client.id,
        name: client.name,
        type: client.type,
        balance: updatedBalance,
      });

      queryClient.setQueryData(['clients', 'getAll'], (oldData: InfiniteData<PaginatedResponse<Client[]>>) => {
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: page.data.map((oldClient) =>
              oldClient.id === client.id
                ? {
                    ...oldClient,
                    balance: updatedBalance,
                  }
                : oldClient,
            ),
          })),
        };
      });

      toast({
        type: 'success',
        text: 'Pedido criado com sucesso.',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao criar o pedido!',
      });
    }
  }

  return {
    categories,
    products,
    product,
    errors,
    control,
    handleSubmit,
    isLoading,
    isLoadingCategories,
    isOrderModalOpen,
    isItemModalOpen,
    isEditItemModalOpen,
    isDeleteItemModalOpen,
    selectedCategory,
    selectedProduct,
    setOrderDetails,
    handleCategorySelect,
    handleOpenItemModal,
    handleCloseItemModal,
    handleOpenEditItemModal,
    handleOpenDeleteItemModal,
    handleCloseEditItemModal,
    handleCloseDeleteItemModal,
    addProductToOrder,
    orderDetails,
    index,
    onSubmit,
  };
}
