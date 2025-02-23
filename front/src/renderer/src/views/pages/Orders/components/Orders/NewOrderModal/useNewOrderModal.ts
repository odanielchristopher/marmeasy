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
import { Order } from '@renderer/app/entities/Order';
import { clientsService } from '@renderer/app/services/clientsService';
import { ordersService } from '@renderer/app/services/ordersService';
import { UpdatedOrderParams } from '@renderer/app/services/ordersService/update';
import { PaginatedResponse } from '@renderer/app/services/types';
import toast from '@renderer/app/utils/toast';
import { OrderDetail } from '../../Items/ItemForm/useItemForm';

export const orderFormSchema = z.object({
  clientName: z.string().min(1, 'O nome do cliente é obrigatório'),
  date: z.date(),
  discount: z.number(),
  items: z
    .array(
      z.object({
        name: z.string(),
        ingredients: z.array(z.string()),
        unitPrice: z.number(),
        quantity: z.number(),
        total: z.number(),
      }),
    )
    .min(0, 'O pedido deve conter pelo menos um item'),
  items: z
    .array(
      z.object({
        name: z.string(),
        ingredients: z.array(z.string()),
        unitPrice: z.number(),
        quantity: z.number(),
        total: z.number(),
      }),
    )
    .min(0, 'O pedido deve conter pelo menos um item'),
  totalValue: z.number(),
});

export type OrderFormSchema = z.infer<typeof orderFormSchema>;

export default function useNewOrderModal(
  isOpen: boolean,
  onClose: () => void,
  order?: Order,
  handleHiddenOrderData?: () => void,
) {
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

  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>(
    order?.items.map((item) => ({
      quantity: item.quantity,
      selectedIngredients: item.ingredients.map((ingredient) => ({
        name: ingredient,
        id: '',
        icon: '',
      })),
      productName: item.name,
      productImage: '',
      productPrice: item.unitPrice,
      totalPrice: item.total,
    })) || [],
  );

  const [product, setProduct] = useState<Product | null>(null);

  const valor = order?.items.reduce((sum, item) => sum + item.total, 0);
  if (order) order.totalValue = valor || 0;

  const {
    formState: { errors },
    control,
    handleSubmit,
    setError,
  } = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      clientName: order ? findClientById(order?.clientId)?.name : '',
      date: order ? new Date(order.date) : new Date(),
      discount: 0,
      items: order?.items || [],
      totalValue: 0,
    },
  });

  useEffect(() => {
    if (isOrderModalOpen !== isOpen) {
      setIsOrderModalOpen(isOpen);
    }
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
    if (productToEdit) {
      const updatedDetails = {
        ...orderDetails[index],
        totalPrice: productToEdit.price * orderDetails[index].quantity,
      };
      setOrderDetails((prevDetails) => [
        ...prevDetails.slice(0, index),
        updatedDetails,
        ...prevDetails.slice(index + 1),
      ]);
    }
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
    const totalPrice = details.productPrice * details.quantity;
    const updatedDetails = { ...details, totalPrice };
    setOrderDetails((prevDetails) => [...prevDetails, updatedDetails]);
    setProduct(product);
  }

  function findClientByName(name: string) {
    return clients.find((client) => client.name === name);
  }

  function findClientById(id: string) {
    return clients.find((client) => client.id === id);
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
          ingredients: item.selectedIngredients.map(
            (ingredient) => ingredient.name,
          ),
          ingredients: item.selectedIngredients.map(
            (ingredient) => ingredient.name,
          ),
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

  //EDIÇÃO DE PEDIDOS
  const { mutateAsync: updateOrder, isPending: isUpdating } = useMutation({
    mutationFn: async (data: OrderFormSchema) => {
      const client = findClientByName(data.clientName);
      if (!client) {
        throw new Error('Client not found');
      }

      const orderData: UpdatedOrderParams = {
        id: order?.id || '',
        clientId: client.id,
        date: data.date,
        discount: data.discount,
        items: orderDetails.map((item) => ({
          name: item.productName,
          ingredients: item.selectedIngredients.map(
            (ingredient) => ingredient.name,
          ),
          unitPrice: item.productPrice,
          quantity: item.quantity,
          total: item.totalPrice,
        })),
        totalValue: 0,
      };

      return ordersService.update(orderData);
    },
    onSuccess: (updatedOrder) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });

      const client = findClientById(updatedOrder.clientId);
      const oldClient = order ? findClientById(order.clientId) : null;

      queryClient.setQueryData(
        ['clients', 'getAll'],
        (oldData: InfiniteData<PaginatedResponse<Client[]>>) => {
          const updatedData = {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((oldClientData) => {
                if (client && oldClientData.id === client.id) {
                  return {
                    ...oldClientData,
                    balance:
                      Number(oldClientData.balance ?? 0) -
                      updatedOrder.totalValue,
                  };
                }
                if (oldClient && oldClientData.id === oldClient.id) {
                  return {
                    ...oldClientData,
                    balance:
                      Number(oldClientData.balance ?? 0) +
                      (order?.totalValue || 0),
                  };
                }
                return oldClientData;
              }),
            })),
          };
          return updatedData;
        },
      );

      onClose();
      if (handleHiddenOrderData) {
        handleHiddenOrderData();
      }
    },
  });

  async function onSubmit(data: OrderFormSchema) {
    const client = findClientByName(data.clientName);
    if (!client) {
      setError('clientName', {
        type: 'manual',
        message: 'Cliente não encontrado',
      });
      setError('clientName', {
        type: 'manual',
        message: 'Cliente não encontrado',
      });
      return;
    }

    if (orderDetails.length === 0) {
      setError('items', {
        type: 'manual',
        message: 'O pedido deve conter pelo menos um item',
      });
      setError('items', {
        type: 'manual',
        message: 'O pedido deve conter pelo menos um item',
      });
      return;
    }

    const newTotalValue = orderDetails.reduce(
      (total, item) => total + item.totalPrice,
      0,
    );

    const orderData = {
      ...data,
      clientId: client.id,
      items: orderDetails.map((item) => ({
        name: item.productName,
        ingredients: item.selectedIngredients.map(
          (ingredient) => ingredient.name,
        ),
        ingredients: item.selectedIngredients.map(
          (ingredient) => ingredient.name,
        ),
        unitPrice: item.productPrice,
        quantity: item.quantity,
        total: item.totalPrice,
      })),
      totalValue: 0,
    };

    try {
      if (order) {
        const oldTotalValue = order.totalValue || 0;
        const difference = newTotalValue - oldTotalValue;

        await updateOrder(orderData);

        const updatedBalance = Number(client.balance ?? 0) - difference;

        if (order.clientId !== client.id) {
          const oldClient = findClientById(order.clientId);

          const updatedBalancePlus =
            Number(oldClient?.balance ?? 0) + oldTotalValue;
          const updatedBalanceLess =
            Number(client.balance ?? 0) - newTotalValue;

          await clientsService.update({
            id: oldClient?.id || '',
            name: oldClient?.name || '',
            type: oldClient?.type as 'FISICO' | 'JURIDICO',
            balance: updatedBalancePlus,
          });

          await clientsService.update({
            id: client.id,
            name: client.name,
            type: client.type,
            balance: updatedBalanceLess,
          });

          // Atualizar o cache do cliente antigo
          queryClient.setQueryData(
            ['clients', 'getAll'],
            (oldData: InfiniteData<PaginatedResponse<Client[]>>) => {
              return {
                ...oldData,
                pages: oldData.pages.map((page) => ({
                  ...page,
                  data: page.data.map((oldClientData) =>
                    oldClientData.id === oldClient?.id
                      ? {
                          ...oldClientData,
                          balance: updatedBalancePlus,
                        }
                      : oldClientData,
                  ),
                })),
              };
            },
          );

          // Atualizar o cache do novo cliente
          queryClient.setQueryData(
            ['clients', 'getAll'],
            (oldData: InfiniteData<PaginatedResponse<Client[]>>) => {
              return {
                ...oldData,
                pages: oldData.pages.map((page) => ({
                  ...page,
                  data: page.data.map((oldClientData) =>
                    oldClientData.id === client.id
                      ? {
                          ...oldClientData,
                          balance: updatedBalanceLess,
                        }
                      : oldClientData,
                  ),
                })),
              };
            },
          );
        } else {
          await clientsService.update({
            id: client.id,
            name: client.name,
            type: client.type,
            balance: updatedBalance,
          });

          // Atualizar o cache do cliente
          queryClient.setQueryData(
            ['clients', 'getAll'],
            (oldData: InfiniteData<PaginatedResponse<Client[]>>) => {
              return {
                ...oldData,
                pages: oldData.pages.map((page) => ({
                  ...page,
                  data: page.data.map((oldClientData) =>
                    oldClientData.id === client.id
                      ? {
                          ...oldClientData,
                          balance: updatedBalance,
                        }
                      : oldClientData,
                  ),
                })),
              };
            },
          );
        }

        toast({
          type: 'success',
          text: 'Pedido atualizado com sucesso.',
        });
      } else {
        await createOrder(orderData);

        const updatedBalance = Number(client.balance ?? 0) - newTotalValue;
        await clientsService.update({
          id: client.id,
          name: client.name,
          type: client.type,
          balance: updatedBalance,
        });

        // Atualizar o cache do cliente
        queryClient.setQueryData(
          ['clients', 'getAll'],
          (oldData: InfiniteData<PaginatedResponse<Client[]>>) => {
            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                data: page.data.map((oldClientData) =>
                  oldClientData.id === client.id
                    ? {
                        ...oldClientData,
                        balance: updatedBalance,
                      }
                    : oldClientData,
                ),
              })),
            };
          },
        );

        toast({
          type: 'success',
          text: 'Pedido criado com sucesso.',
        });
      }
    } catch (error) {
      toast({
        type: 'danger',
        text: order
          ? 'Ocorreu um erro ao atualizar o pedido!'
          : 'Ocorreu um erro ao criar o pedido!',
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
    isUpdating,
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
    findClientById,
    orderDetails,
    index,
    onSubmit,
  };
}
