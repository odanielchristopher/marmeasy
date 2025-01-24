import React, { useState } from 'react';
import Modal from '@renderer/views/components/Modal';
import { CheckBoxStyle, Container, IngredientBox } from './styles';
import { Product } from '@renderer/app/entities/Product';
import { Input } from '@renderer/views/components/Input';
import * as Checkbox from '@radix-ui/react-checkbox';
import { FaCheck } from 'react-icons/fa6';
import { StyledRdxCheckbox } from '@renderer/views/pages/Menu/components/Products/IngredientsSection/styles';

interface IngredientsModalProps {
  open: boolean;
  children?: React.ReactNode;
  onClose(): void;
  description?: string;
  answer: string;
  onConfirm(): void;
  product: Product;
  title: string;
}

export default function IngredientsModal({ open, answer, onClose, product, title }: IngredientsModalProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<{ [key: string]: boolean }>({});

  const handleCheckboxChange = (ingredientId: string) => {
    setSelectedIngredients((prev) => ({
      ...prev,
      [ingredientId]: !prev[ingredientId],
    }));
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
                <label className="ingredientLabel" htmlFor={ingredient.id} key={ingredient.id} onClick={() => handleCheckboxChange(ingredient.id)}>
                  <IngredientBox>
                    {ingredient.icon}
                    {ingredient.name}
                    <CheckBoxStyle
                      id={ingredient.id}
                      checked={isChecked}
                    >
                    <Checkbox.Indicator className="indicator">
                      <FaCheck size={10} />
                    </Checkbox.Indicator>
                  </CheckBoxStyle>
                  </IngredientBox>
                </label>
              );
            })}
          </div>
        </div>
        <div className='quantity-box'>
          <p>Quantidade*:</p>
          <Input type="number" name={'quantity'} />
        </div>

        <button onClick={onClose}>Cancelar</button>
        <button onClick={onClose}>Adicionar</button>
        
      </Container>
    </Modal>
  );
}
