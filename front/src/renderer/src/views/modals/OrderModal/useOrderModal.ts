import { useState, useEffect } from 'react';
import { useProductsQuery } from '@renderer/app/hooks/queries/useProductsQuery';
import { useProductCategoriesQuery } from '@renderer/app/hooks/queries/useProductCategoriesQuery';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { Product } from '@renderer/app/entities/Product';
import { useForm } from 'react-hook-form';
import { Ingredient } from '@renderer/app/entities/Ingredient';
import { useMutation } from '@tanstack/react-query';

interface OrderDetail {
  selectedIngredients: Ingredient[];
  quantity: number;
  productName: string;
  productImage: string;
  productPrice: number;
  totalPrice: number;
}

export default function useOrderModal(isOpen) {
  const { watch, setValue } = useForm();

  const { categories, isLoading: isLoadingCategories } =
    useProductCategoriesQuery();
  const { products, isLoading: isLoadingProducts } = useProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();
  const [orderDate, setOrderDate] = useState('');
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

  const mutation = useMutation((newOrder) => {
    // Replace with your API call
    return fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(newOrder),
    });
  });

  const handleOrderSubmit = () => {
    if (orderDetails.length > 0) {
      mutation.mutate(orderDetails);
    }
  };

  return {
    categories,
    products,
    isLoadingCategories,
    isLoadingProducts,
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
