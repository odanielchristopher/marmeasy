import { useState } from 'react';
import { useProductsQuery } from '@renderer/app/hooks/queries/useProductsQuery';
import { useProductCategoriesQuery } from '@renderer/app/hooks/queries/useProductCategoriesQuery';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { Product } from '@renderer/app/entities/Product';

export default function useAddOrder() {
    const { categories, isLoading: isLoadingCategories } = useProductCategoriesQuery();
    const { products, isLoading: isLoadingProducts } = useProductsQuery();
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();
    const [orderDate, setOrderDate] = useState('');
    const [openModalIngredients, setOpenModalIngredients] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
        handleCategorySelect,
        handleOrderDateChange,
        handleOpenModalIngredients,
        handleCloseModalIngredients,
    };
}