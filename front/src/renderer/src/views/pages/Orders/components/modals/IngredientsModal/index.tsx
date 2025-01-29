import * as Checkbox from '@radix-ui/react-checkbox';
import { Product } from '@renderer/app/entities/Product';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import Button from '@renderer/views/components/Button';
import Modal from '@renderer/views/components/Modal';
import { TimesNumericInput } from '@renderer/views/components/TimesNumericInput';
import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import { CheckBoxStyle, Container } from './styles';
import useIngredientsModal, { OrderDetail } from './useIngredientsModal';

interface IngredientsModalProps {
  open: boolean;
  children?: React.ReactNode;
  onClose(): void;
  description?: string;
  answer: string;
  product: Product;
  title: string;
  addProductToOrder(details: OrderDetail): void;
}


export default function IngredientsModal({
  open,
  answer,
  onClose,
  product,
  title,
  addProductToOrder,
}: IngredientsModalProps) {
  const {
    selectedIngredients,
    quantity,
    handleCheckboxChange,
    handleQuantityChange,
  } = useIngredientsModal();

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <Container>
        {answer}
        <div>
          <div key={product.id}>
            {product.ingredients.map((ingredient) => {
              const isChecked = selectedIngredients.some((ing) => ing.id === ingredient.id);

              return (
                <label
                  className="ingredientLabel"
                  htmlFor={ingredient.id}
                  key={ingredient.id}
                >
                  <span>
                    {ingredient.icon} {capitalizeFirstLetter(ingredient.name)}
                  </span>
                  <CheckBoxStyle
                    id={ingredient.id}
                    onCheckedChange={() => handleCheckboxChange(ingredient)}
                    checked={isChecked}
                  >
                    <Checkbox.Indicator className="indicator">
                      <FaCheck size={10} />
                    </Checkbox.Indicator>
                  </CheckBoxStyle>
                </label>
              );
            })}
          </div>
        </div>
        <div className="quantity-box">
          <p>Quantidade*:</p>
          <TimesNumericInput
            value={quantity}
            name="quantity"
            onInputChange={handleQuantityChange}
          />
        </div>

        <Button onClick={() => {
          const productDetails: OrderDetail = {
            selectedIngredients,
            quantity,
            productName: product.name,
            productImage: product.imagePath,
            productPrice: product.price,
            totalPrice: product.price * quantity,
          };
          addProductToOrder(productDetails);
          onClose();
        }}>
          Adicionar
        </Button>
      </Container>
    </Modal>
  );
}
