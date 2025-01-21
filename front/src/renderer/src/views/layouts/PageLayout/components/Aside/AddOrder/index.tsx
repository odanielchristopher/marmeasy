import { useState } from 'react';
import { Client } from '@renderer/app/entities/Client';
import { Input } from '@renderer/views/components/Input';
import { Container, IconCategory, ProductList } from './styles';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import noImage from '@renderer/assets/Images/empty-image.svg';
import Plus from '@renderer/assets/Images/Plus.svg';
import IngredientModal from '@renderer/views/modals/IngredientsModal';
import useAddOrder from './useAddOrder';
import Loader from '@renderer/views/components/Loader';

interface AddOrderProps {
    client: Client | null;
}

export default function AddOrder({ client }: AddOrderProps) {
    const {
        categories,
        products,
        isLoadingCategories,
        selectedCategory,
        orderDate,
        openModalIngredients,
        selectedProduct,
        handleCategorySelect,
        handleOrderDateChange,
        handleOpenModalIngredients,
        handleCloseModalIngredients,
    } = useAddOrder();

    return (
        <Container>
            <header>
                <p>Adicionar Pedido ao cliente <strong>{client?.name}</strong></p>
            </header>

            <Input
                type="date"
                placeholder="Data do pedido*"
                name='OrderDate'
                onChange={(e) => handleOrderDateChange(e.target.value)}
            />
            {isLoadingCategories ? (
                <div className="ingredient-loader">
                    <Loader $isLoading size={24} />
                </div>//! estilizar o loading
            ) : (
                <footer>
                    <ul className='categoriesOptions'>
                        {categories.map((category) => (
                            <IconCategory key={category.id} onClick={() => handleCategorySelect(category)} className={selectedCategory?.id === category.id ? 'active' : ''}>
                                <div className="circle">
                                    {category.icon}
                                </div>
                                <p>
                                    {category.name}
                                </p>
                            </IconCategory>
                        ))}
                    </ul>
                    <ul className='productsOptions'>
                        {selectedCategory && products.filter((product) => product.category.id === selectedCategory.id).map((product) => {
                            const imagePath = product.imagePath && `${import.meta.env.VITE_API_URL}/${product.imagePath}`;
                            const hasIngredients = product.ingredients.length > 0;

                            return (
                                <ProductList key={product.id}>
                                    {product.imagePath ? <img src={imagePath} /> : <img src={noImage} alt="Sem imagem" />}
                                    <div className='infos'>
                                        <strong>{product.name}</strong>
                                        <span>{product.description}</span>
                                        <div className="footer">
                                            <strong>R$ {formatCurrency(product.price)}</strong>
                                            <img src={Plus} alt="Adicionar" onClick={() =>  handleOpenModalIngredients(product)} />
                                            {selectedProduct && (
                                                <IngredientModal
                                                    open={openModalIngredients}
                                                    onClose={handleCloseModalIngredients}
                                                    answer={ hasIngredients ? 'Escolha os ingredientes que serão adicionados ao pedido' : 'Escolha a quantidade de itens'}
                                                    product={selectedProduct}
                                                    onConfirm={() => {
                                                        //! to-do
                                                        handleCloseModalIngredients();
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </ProductList>
                            );
                        })}
                    </ul>
                </footer>
            )}
        </Container>
    );
}
