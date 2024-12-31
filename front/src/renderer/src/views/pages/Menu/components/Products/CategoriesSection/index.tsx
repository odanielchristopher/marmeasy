import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { useProductCategoriesQuery } from '@renderer/app/hooks/queries/useProductCategoriesQuery';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import Loader from '@renderer/views/components/Loader';
import { CgCloseO } from 'react-icons/cg';
import { Container, Item, List } from './styles';

interface CategoriesSectionProps {
  $error?: string;
  selectedCategory: ProductCategory;
  onSelect(category: ProductCategory): void;
}

export default function CategoriesSection({
  $error,
  selectedCategory,
  onSelect,
}: CategoriesSectionProps) {
  const { categories, isLoading } = useProductCategoriesQuery();

  return (
    <Container>
      <header>
        <p className="title">Categoria</p>

        {$error && (
          <span className="error">
            <CgCloseO color="#F63131" />
            {$error}
          </span>
        )}
      </header>

      <List>
        {isLoading && (
          <div className="categories-loader">
            <Loader size={14} $isLoading />
          </div>
        )}

        {!isLoading &&
          categories.map((categorie, key) => (
            <Item
              key={key}
              $selected={categorie.id === selectedCategory?.id}
              onClick={() => onSelect(categorie)}
              tabIndex={0} // Permite navegação por teclado
              onKeyDown={(e) => e.key === 'Enter' && onSelect(categorie)}
            >
              <span>{categorie.icon}</span>
              <span>{capitalizeFirstLetter(categorie.name)}</span>
            </Item>
          ))}
      </List>
    </Container>
  );
}
