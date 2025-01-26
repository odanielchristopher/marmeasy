import * as Checkbox from '@radix-ui/react-checkbox';
import { Ingredient } from '@renderer/app/entities/Ingredient';
import { Product } from '@renderer/app/entities/Product';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import Button from '@renderer/views/components/Button';
import Modal from '@renderer/views/components/Modal';
import { TimesNumericInput } from '@renderer/views/components/TimesNumericInput';
import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import { CheckBoxStyle, Container } from './styles';
import useIngredientsModal from './useIngredientsModal';

interface IngredientsModalProps {
  open: boolean;
  children?: React.ReactNode;
  onClose(): void;
  description?: string;
  answer: string;
  onConfirm(): void;
  product: Product;
  title: string;
  onSelected(ingredient: Ingredient): void;
  selectedIngredientsIds: string[];
  onSubmit: (data: { selectedIngredients: Ingredient[], quantity: number, productName: string, productImage: string, productPrice: number, totalPrice: number }) => void;
}

export default function IngredientsModal({
  open,
  answer,
  onClose,
  product,
  title,
  onSelected,
  onSubmit,
}: IngredientsModalProps) {
  const {
    selectedIngredients,
    quantity,
    handleCheckboxChange,
    handleQuantityChange,
    handleSubmit,
  } = useIngredientsModal({ onSelected, onSubmit, productName: product.name, productImage: product.imagePath, productPrice: product.price });

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
                    {' '}
                    {ingredient.icon} {capitalizeFirstLetter(ingredient.name)}{' '}
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

        <Button onClick={handleSubmit}>
          Adicionar
        </Button>
      </Container>
    </Modal>
  );
}
