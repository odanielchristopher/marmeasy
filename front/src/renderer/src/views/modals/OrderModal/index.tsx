import React, { useState } from 'react';
import Button from '@renderer/views/components/Button';
import CurrencyInput from '@renderer/views/components/CurrencyInput';
import { Input } from '@renderer/views/components/Input';
import InputMask from '@renderer/views/components/InputMask';
import Modal from '@renderer/views/components/Modal';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { Controller } from 'react-hook-form';

import { IconCategory, BoxCategories, ProductList, Overlay } from './styles';

import useOrderModal from './useOrderModal';

import noImage from '@renderer/assets/Images/empty-image.svg';
import Plus from '@renderer/assets/Images/Plus.svg';

import IngredientModal from '@renderer/views/modals/IngredientsModal';

interface OrderModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const { categories, selectedCategory, handleCategorySelect, products, selectedProduct, openModalIngredients, handleOpenModalIngredients, handleCloseModalIngredients } = useOrderModal(isOpen, onClose);
  const [status, setStatus] = useState(false);

  return (
    <>
      <Modal open={isOpen} title="Novo pedido" onClose={onClose}>
          <input type="text" placeholder='nome do cliente' />
        
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
                              </div>
                          </div>
                      </ProductList>
                  );
              })}
          </ul>
      </Modal>

      {openModalIngredients && selectedProduct && (
        <IngredientModal
          open={openModalIngredients}
          onClose={handleCloseModalIngredients}
          product={selectedProduct}
          answer={'Escolha os ingredientes que serão adicionados ao pedido'}
          onConfirm={() => {
            // Implementar lógica de confirmação
            handleCloseModalIngredients();
          }}
        />
      )}
    </>
  );
}
