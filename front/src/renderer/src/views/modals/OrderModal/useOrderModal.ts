import { Product } from '@renderer/app/entities/Product';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { useProductCategoriesQuery } from '@renderer/app/hooks/queries/useProductCategoriesQuery';
import { useProductsQuery } from '@renderer/app/hooks/queries/useProductsQuery';
import { useEffect, useState } from 'react';

interface useOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function useOrderModal({ isOpen }: useOrderModalProps) {
  const { categories, isLoading: isLoadingCategories } =
    useProductCategoriesQuery();
  const { products, isLoading: isLoadingProducts } = useProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();
  const [orderDate, setOrderDate] = useState('');
  const [openModalIngredients, setOpenModalIngredients] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(isOpen);

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

  return {
    categories,
    products,
    isLoadingCategories,
    isLoadingProducts,
    selectedCategory,
    orderDate,
    openModalIngredients,
    selectedProduct,
    isOrderModalOpen,
    handleCategorySelect,
    handleOrderDateChange,
    handleOpenModalIngredients,
    handleCloseModalIngredients,
    handleOpenIngredientModal,
    handleCloseIngredientModal,
  };
}
