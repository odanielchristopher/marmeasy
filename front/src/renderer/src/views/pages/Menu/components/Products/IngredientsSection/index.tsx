import * as Checkbox from '@radix-ui/react-checkbox';
import { FaCheck } from 'react-icons/fa6';

import { Ingredient } from '@renderer/app/entities/Ingredient';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import Loader from '@renderer/views/components/Loader';

import useIngredientsSection from './useIngredientsSection';

import { Container, StyledRdxCheckbox } from './styles';

interface IngredientsProps {
  openNewIngredientModal(): void;
  onSelected(ingredient: Ingredient): void;
  selectedIngredientsIds: string[];
}

export default function IngredientsSection({
  openNewIngredientModal,
  onSelected,
  selectedIngredientsIds,
}: IngredientsProps) {
  const { isLoading, filteredIngredients, handleChangeSearchTerm } =
    useIngredientsSection();

  return (
    <Container>
      <header>
        <h3>Ingredientes</h3>
        <button onClick={openNewIngredientModal}>Novo ingrediente</button>
      </header>

      <div className="filter">
        <span>Busque o ingrediente</span>

        <input
          type="text"
          placeholder="Ex: Baião"
          onChange={(event) => handleChangeSearchTerm(event)}
        />
      </div>

      <div className="list">
        {isLoading && (
          <div className="ingredient-loader">
            <Loader $isLoading size={24} />
          </div>
        )}

        {!isLoading &&
          filteredIngredients.map((ingredient, key) => {
            const isChecked = selectedIngredientsIds.some(
              (ingredientsId) => ingredientsId === ingredient.id,
            );

            return (
              <label className="item" htmlFor={ingredient.id} key={key}>
                <span>
                  {ingredient.icon} {capitalizeFirstLetter(ingredient.name)}
                </span>

                <StyledRdxCheckbox
                  id={ingredient.id}
                  onCheckedChange={() => onSelected(ingredient)}
                  checked={isChecked}
                >
                  <Checkbox.Indicator className="indicator">
                    <FaCheck size={10} />
                  </Checkbox.Indicator>
                </StyledRdxCheckbox>
              </label>
            );
          })}
      </div>
    </Container>
  );
}
