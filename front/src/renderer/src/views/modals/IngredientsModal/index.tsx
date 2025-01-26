import * as Checkbox from '@radix-ui/react-checkbox';
import { Ingredient } from '@renderer/app/entities/Ingredient';
import { Product } from '@renderer/app/entities/Product';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import Button from '@renderer/views/components/Button';
import Modal from '@renderer/views/components/Modal';
import { TimesNumericInput } from '@renderer/views/components/TimesNumericInput';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { CheckBoxStyle, Container } from './styles';

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
}

export default function IngredientsModal({
  open,
  answer,
  onClose,
  product,
  title,
  onSelected,
}: IngredientsModalProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<{
    [key: string]: boolean;
  }>({});

  const [quantity, setQuantity] = useState<string>('');

  const handleCheckboxChange = (ingredientId: string) => {
    setSelectedIngredients((prev) => ({
      ...prev,
      [ingredientId]: !prev[ingredientId],
    }));
    onSelected(
      product.ingredients.find((ingredient) => ingredient.id === ingredientId)!,
    );
  };

  const handleQuantityChange = (value?: string) => {
    setQuantity(value || '');
  };

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <Container>
        {answer}
        <div>
          <div key={product.id}>
            {product.ingredients.map((ingredient) => {
              const isChecked = selectedIngredients[ingredient.id] || false;

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
                    onCheckedChange={() => handleCheckboxChange(ingredient.id)}
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

        <Button>Adicionar</Button>
      </Container>
    </Modal>
  );
}
