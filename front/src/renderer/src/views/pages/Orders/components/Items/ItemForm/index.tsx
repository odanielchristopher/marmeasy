import * as Checkbox from '@radix-ui/react-checkbox';
import { Ingredient } from '@renderer/app/entities/Ingredient';
import { Product } from '@renderer/app/entities/Product';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import Button from '@renderer/views/components/Button';
import { TimesNumericInput } from '@renderer/views/components/TimesNumericInput';
import { FaCheck } from 'react-icons/fa6';
import { CheckBoxStyle } from './styles';
import useItemForm, { OrderDetail } from './useItemForm';

interface ItemFormProps {
  onClose(): void;
  product: Product;
  onSubmit(details: OrderDetail): void;
  order?: OrderDetail;
}

export default function ItemForm({
  onClose,
  product,
  onSubmit,
  order,
}: ItemFormProps) {
  const {
    selectedIngredients,
    quantity,
    handleCheckboxChange,
    handleQuantityChange,
    errors,
  } = useItemForm(order);

  return (
    <>
      <div>
        <div key={product.id}>
          {product.ingredients.map((ingredient: Ingredient) => {
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
          $error={errors.quantity?.message}
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
        onSubmit(productDetails);
        onClose();
      }}>
        Adicionar
      </Button>
  </>
  );
}
