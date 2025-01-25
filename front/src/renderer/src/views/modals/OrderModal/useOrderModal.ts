import { useState } from 'react';
import { useProductsQuery } from '@renderer/app/hooks/queries/useProductsQuery';
import { useProductCategoriesQuery } from '@renderer/app/hooks/queries/useProductCategoriesQuery';
import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { Product } from '@renderer/app/entities/Product';
import { useForm } from 'react-hook-form';
import { Ingredient } from '@renderer/app/entities/Ingredient';

export default function useOrderModal() {

    const { watch, setValue } = useForm();

    const { categories, isLoading: isLoadingCategories } = useProductCategoriesQuery();
    const { products, isLoading: isLoadingProducts } = useProductsQuery();
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();
    const [orderDate, setOrderDate] = useState('');
    const [openModalIngredients, setOpenModalIngredients] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
        setValue ('ingredientsIds', [...currentIngredients, ingredient.id], {
            shouldValidate: true,
        });
    }

    return {
        categories,
        products,
        isLoadingCategories,
        isLoadingProducts,
        selectedCategory,
        selectedIngredientsIds,
        orderDate,
        openModalIngredients,
        selectedProduct,
        handleCategorySelect,
        handleOrderDateChange,
        handleOpenModalIngredients,
        handleCloseModalIngredients,
        handleSelectedIngredients,
    };
}