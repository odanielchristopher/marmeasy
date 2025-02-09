import * as Checkbox from '@radix-ui/react-checkbox';

import { Ingredient } from '@renderer/app/entities/Ingredient';
import { Product } from '@renderer/app/entities/Product';

import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';

import Button from '@renderer/views/components/Button';
import { TimesNumericInput } from '@renderer/views/components/TimesNumericInput';

import { CgCloseO } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa6';

import useItemForm, { OrderDetail } from './useItemForm';

import { CheckBoxStyle, Container, QuantityContainer } from './styles';

interface ItemFormProps {
  onClose(): void;
  product: Product;
  onSubmit(details: OrderDetail): void;
  order?: OrderDetail;
  hasIngredients: boolean;
}

export default function ItemForm({
  onClose,
  product,
  onSubmit,
  order,
  hasIngredients,
}: ItemFormProps) {
  const {
    selectedIngredients,
    quantity,
    handleCheckboxChange,
    handleQuantityChange,
    handleSubmit,
    onSubmitForm,
    errors,
  } = useItemForm(order, product, onSubmit, onClose);

  return hasIngredients ? (
    <>
      <Container>
        <div key={product.id}>
          {product.ingredients.map((ingredient: Ingredient) => {
            const isChecked = selectedIngredients.some(
              (ing) => ing.id === ingredient.id,
            );

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
        {errors.selectedIngredients?.message && (
          <span className="error">
            <CgCloseO color="#F63131" />
            {errors.selectedIngredients.message}
          </span>
        )}
        <QuantityContainer>
          <p>Quantidade*:</p>
          <TimesNumericInput
            $error={errors.quantity?.message}
            value={quantity}
            name="quantity"
            onInputChange={handleQuantityChange}
          />
        </QuantityContainer>

        <Button className="btnSubmit" onClick={handleSubmit(onSubmitForm)}>
          Adicionar
        </Button>
      </Container>
    </>
  ) : (
    <Container>
      <QuantityContainer>
        <p>Quantidade*:</p>
        <TimesNumericInput
          $error={errors.quantity?.message}
          value={quantity}
          name="quantity"
          onInputChange={handleQuantityChange}
        />
      </QuantityContainer>

      <Button className="btnSubmit" onClick={handleSubmit(onSubmitForm)}>
        Adicionar
      </Button>
    </Container>
  );
}
