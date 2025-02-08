import { useCallback, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { z } from 'zod';

import { Product } from '@renderer/app/entities/Product';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';

import { useProductCategoriesQuery } from '@renderer/app/hooks/queries/useProductCategoriesQuery';
import { useProductsQuery } from '@renderer/app/hooks/queries/useProductsQuery';

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

export default function useOrderModal(isOpen: boolean) {

  const { categories, isLoading: isLoadingCategories } =
    useProductCategoriesQuery();
  const { products } = useProductsQuery();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(isOpen);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState(false);

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    from: undefined,
  });

  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

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
  };

  function handleCloseItemModal() {
    setIsItemModalOpen(false);
    setIsOrderModalOpen(true);
  };

  // actions item modals
  function handleOpenEditItemModal(index: number) {
    setEditIndex(index);
    setIsEditItemModalOpen(true);
    setIsOrderModalOpen(false);
  };

  function handleCloseEditItemModal() {
    setIsEditItemModalOpen(false);
    setIsOrderModalOpen(true);
  }

  function handleOpenDeleteItemModal(index: number) {
    setEditIndex(index);
    setIsDeleteItemModalOpen(true);
    setIsOrderModalOpen(false);
  };

  function handleCloseDeleteItemModal() {
    setIsDeleteItemModalOpen(false);
    setIsOrderModalOpen(true);
  }

  function addProductToOrder(details: OrderDetail) {
    setOrderDetails((prevDetails) => [...prevDetails, details]);
  }

  //datepicker
  const handleSelectedDateRange = useCallback((date: DateRange) => {
    setSelectedDateRange(date);
  }, []);

  return {
    categories,
    products,
    isLoadingCategories,
    isOrderModalOpen,
    isItemModalOpen,
    isEditItemModalOpen,
    isDeleteItemModalOpen,
    selectedCategory,
    selectedProduct,
    selectedDateRange,
    setOrderDetails,
    handleCategorySelect,
    handleOpenItemModal,
    handleCloseItemModal,
    handleOpenEditItemModal,
    handleOpenDeleteItemModal,
    handleCloseEditItemModal,
    handleCloseDeleteItemModal,
    handleSelectedDateRange,
    addProductToOrder,
    orderDetails,
    editIndex,
  };
}
