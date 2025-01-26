import React, { useState } from 'react';
import Modal from '@renderer/views/components/Modal';
import { CheckBoxStyle, Container } from './styles';
import { Product } from '@renderer/app/entities/Product';
import { Input } from '@renderer/views/components/Input';
import * as Checkbox from '@radix-ui/react-checkbox';
import { FaCheck } from 'react-icons/fa6';
import Button from '@renderer/views/components/Button';
import { Ingredient } from '@renderer/app/entities/Ingredient';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';

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

  const handleCheckboxChange = (ingredientId: string) => {
    setSelectedIngredients((prev) => ({
      ...prev,
      [ingredientId]: !prev[ingredientId],
    }));
    onSelected(
      product.ingredients.find((ingredient) => ingredient.id === ingredientId)!,
    );
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
          <Input type="number" name={'quantity'} />
        </div>

        <Button>Adicionar</Button>
      </Container>
    </Modal>
  );
}
