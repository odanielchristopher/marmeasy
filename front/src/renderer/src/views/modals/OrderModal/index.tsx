// ! organizar as importações
import React, { useState, useEffect } from 'react';
import Modal from '@renderer/views/components/Modal';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { IconCategory, BoxCategories, ProductList, Container } from './styles';
import useOrderModal from './useOrderModal';
import noImage from '@renderer/assets/Images/empty-image.svg';
import Plus from '@renderer/assets/Images/Plus.svg';
import IngredientModal from '@renderer/views/modals/IngredientsModal';
import { Product } from '@renderer/app/entities/Product';
import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';

interface OrderModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const {
    categories,
    selectedCategory,
    products,
    selectedProduct,
    selectedIngredientsIds,
    openModalIngredients,
    handleCategorySelect,
    handleOpenModalIngredients,
    handleCloseModalIngredients,
    handleSelectedIngredients,
  } = useOrderModal();


  // ! organizar para o hook
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

  return (
    <>
      {!openModalIngredients && (
        <Modal open={isOrderModalOpen} title="Novo pedido" onClose={onClose}>
            <Container>
            <Input 
            type="text"
            placeholder="Nome do cliente"
            maxLength={15}
            name='clientName'
            />
            
            <BoxCategories>
                {categories.map((category) => (
                  <IconCategory key={category.id} onClick={() => handleCategorySelect(category)} className={selectedCategory?.id === category.id ? 'active' : ''}>
                      <div className="circle">
                        {category.icon}
                      </div>
                      <p>{category.name}</p>
                  </IconCategory>
                ))}
            </BoxCategories>

            <ul className='productsOptions'>
                {selectedCategory && products.filter((product) => product.category.id === selectedCategory.id).map((product) => {
                const imagePath = product.imagePath && `${import.meta.env.VITE_API_URL}/${product.imagePath}`;

                return (
                        <ProductList key={product.id}>
                          {product.imagePath ? <img src={imagePath} /> : <img src={noImage} alt="Sem imagem" />}
                          <div className='infos'>
                            <strong>{product.name}</strong>
                            <span>{product.description}</span>
                            <div className="footer">
                              <strong>R$ {formatCurrency(product.price)}</strong>
                              <img src={Plus} alt="Adicionar" onClick={() => handleOpenIngredientModal(product)} />
                            </div>
                          </div>
                        </ProductList>
                );
                })}
            </ul>
            <Button type="submit">
                Fazer Pedido
            </Button>
            </Container>
        </Modal>
      )}

      {openModalIngredients && selectedProduct && (
        <IngredientModal
          onSelected={handleSelectedIngredients}
          selectedIngredientsIds={selectedIngredientsIds}
          open={openModalIngredients}
          onClose={handleCloseIngredientModal}
          product={selectedProduct}
          title={selectedProduct.ingredients.length > 0 ? 'Ingredientes e Quantidade' : 'Quantidade'}
          answer={selectedProduct.ingredients.length > 0 ? 'Selecione os ingredientes desejados' : 'Deseja adicionar este produto ao pedido?'}
          onConfirm={() => {
            // !Implementar lógica de confirmação
            handleCloseIngredientModal();
          }}
        />
      )}
    </>
  );
}
