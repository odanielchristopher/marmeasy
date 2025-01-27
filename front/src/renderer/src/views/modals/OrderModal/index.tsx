import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import Edit from '@renderer/assets/Images/Edit.svg';
import noImage from '@renderer/assets/Images/empty-image.svg';
import Plus from '@renderer/assets/Images/Plus.svg';
import Trash from '@renderer/assets/Images/Trash.svg';
import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import Modal from '@renderer/views/components/Modal';
import IngredientModal from '@renderer/views/modals/IngredientsModal';
import { BoxCategories, Container, IconCategory, Line, OrderItemsList, ProductList } from './styles';
import useOrderModal from './useOrderModal';

interface OrderModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const {
    categories,
    products,
    isOrderModalOpen,
    selectedCategory,
    orderDetails,
    openModalIngredients,
    selectedProduct,
    handleCategorySelect,
    handleSelectedIngredients,
    handleOpenIngredientModal,
    handleCloseIngredientModal,
    handleIngredientsSubmit,
    handleOrderSubmit,
  } = useOrderModal(isOpen);

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

            {/* <DatePickerInput/> */}

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
              {selectedCategory && products.filter((product) => product.category?.id === selectedCategory.id).map((product) => {
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
          open={openModalIngredients}
          onClose={handleCloseIngredientModal}
          product={selectedProduct}
          title={
            selectedProduct.ingredients.length > 0
              ? 'Ingredientes e Quantidade'
              : 'Quantidade'
          }
          answer={
            selectedProduct.ingredients.length > 0
              ? 'Selecione os ingredientes desejados'
              : 'Deseja adicionar este produto ao pedido?'
          }
          onConfirm={() => {
            handleCloseIngredientModal();
          }}
          onSubmit={handleIngredientsSubmit}
        />
      )}
    </>
  );
}
