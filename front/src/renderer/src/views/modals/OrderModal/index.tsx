import { Product, Ingredient } from '@renderer/app/entities/Product';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import noImage from '@renderer/assets/Images/empty-image.svg';
import Plus from '@renderer/assets/Images/Plus.svg';
import Edit from '@renderer/assets/Images/Edit.svg';
import Trash from '@renderer/assets/Images/Trash.svg';
import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import Modal from '@renderer/views/components/Modal';
import IngredientModal from '@renderer/views/modals/IngredientsModal';
import { useEffect, useState } from 'react';
import { BoxCategories, Container, IconCategory, ProductList, Line, OrderItemsList } from './styles';
import useOrderModal from './useOrderModal';
import { useMutation } from '@tanstack/react-query';

interface OrderModalProps {
  isOpen: boolean;
  onClose(): void;
}

interface OrderDetail {
  selectedIngredients: Ingredient[];
  quantity: number;
  productName: string;
  productImage: string;
  productPrice: number;
  totalPrice: number;
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

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(isOpen);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

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

            {orderDetails.length > 0 && (
              <div className="orderDetails">
                <Line />
                {orderDetails.map((order, index) => {
                  const imagePath = order.productImage ? `${import.meta.env.VITE_API_URL}/${order.productImage}` : noImage;
                  return (
                    <OrderItemsList key={index}>
                      <img className="smallImg" src={imagePath} alt={order.productName} />
                        <div className="infoOrder">
                          <div className="nameDetails">
                            <p><strong>{order.productName}</strong></p>
                            {order.selectedIngredients.map((ingredient) => (
                                <span key={ingredient.id}>{ingredient.name}</span>
                              ))}
                          </div>
                          <div className="priceQuantity">
                            <p><strong>R$ {formatCurrency(order.productPrice)}</strong></p>
                            <span>{order.quantity}X</span>
                          </div>
                        </div>
                        <div className="functions">
                          <img src={Edit} alt="" />
                          <img src={Trash} alt="" />
                        </div>
                    </OrderItemsList>
                  );
                })}
              </div>
            )}

            <Button type="submit" onClick={handleOrderSubmit}>
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
            handleCloseIngredientModal();
          }}
          onSubmit={handleIngredientsSubmit}
        />
      )}
    </>
  );
}
