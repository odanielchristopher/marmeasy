import React, { useState } from 'react';
import Modal from '@renderer/views/components/Modal';
import { CheckBoxStyle, Container } from './styles';
import { IngredientBox } from './styles';
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
}

export default function IngredientsModal({ open, answer, onClose, product }: IngredientsModalProps) {

  return (
    <Modal
      open={open}
      title="Ingredientes"
      onClose={onClose}>
        
        <Container>
          {answer}
          <div>
            <div key={product.id}>
              {product.ingredients.map((ingredient) => {
                // const isChecked = selectedIngredientsIds.some((ingredient) => ingredientsId === ingredient.id);
                const [isChecked, setIsChecked] = useState(false);
                
                // console.log(ingredient.id);
                return (
                    <label className="ingredientLabel" htmlFor={ingredient.id} key={ingredient.id}>
                      <IngredientBox>
                        {ingredient.icon}
                      </IngredientBox>

                      {/* onCheckedChange={() => onSelected(ingredient)} checked={isChecked} */}
                      <CheckBoxStyle id={ingredient.id} onCheckedChange={ () => setIsChecked(!isChecked) } checked={isChecked}>
                        <Checkbox.Indicator className="indicator">
                          <FaCheck size={10} />
                        </Checkbox.Indicator>
                      </CheckBoxStyle>
                  </label>
              )})}
            </div>
          </div>
          <div className='quantity-box'>
            <p>Quantidade*:</p>
            {/*//! mudar para react-hook-form */}
            <Input type="number" name={'quantity'} />
          </div>
        </Container>
    </Modal>
  );
}
