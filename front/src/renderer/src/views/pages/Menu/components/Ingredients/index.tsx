import * as Checkbox from '@radix-ui/react-checkbox';
import { FaCheck } from 'react-icons/fa6';

import { Ingredient } from '@renderer/app/entities/Ingredient';
import Loader from '@renderer/views/components/Loader';
import { StyledRdxCheckbox } from '../Products/NewProductModal/styles';

import { useIngredients } from '@renderer/app/hooks/queries/useIngredients';
import { Container } from './styles';

interface IngredientsProps {
  openNewIngredientModal(): void
  onSelected(ingredient: Ingredient): void
}

export default function Ingredients({ openNewIngredientModal, onSelected }: IngredientsProps) {
  const { ingredients, isLoading } = useIngredients();

  return (
    <Container>
      <header>
        <h3>Ingredientes</h3>
        <button onClick={openNewIngredientModal}>Novo ingrediente</button>
      </header>

      <div className="filter">
        <span>Busque o ingrediente</span>

        <input type="text" placeholder="Ex: Baião" />
      </div>

      <div className="list">
        {isLoading && (
          <div className="ingredient-loader">
            <Loader $isLoading size={24} />
          </div>
        )}

        {!isLoading &&
          ingredients.map((ingredient, key) => (
            <label className="item" htmlFor={ingredient.id} key={key}>
              <span>
                {ingredient.icon} {ingredient.name}
              </span>

              <StyledRdxCheckbox id={ingredient.id} onCheckedChange={() => onSelected(ingredient)}>
                <Checkbox.Indicator className="indicator">
                  <FaCheck size={10} />
                </Checkbox.Indicator>
              </StyledRdxCheckbox>
            </label>
          ))}
      </div>
    </Container>
  );
}
