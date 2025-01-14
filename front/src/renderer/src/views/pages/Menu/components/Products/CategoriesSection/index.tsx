import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import { useProductCategoriesQuery } from '@renderer/app/hooks/queries/useProductCategoriesQuery';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import Loader from '@renderer/views/components/Loader';
import { CgCloseO } from 'react-icons/cg';


import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import { Container, Item, StyledSwiper } from './styles';

interface CategoriesSectionProps {
  $error?: string;
  selectedCategoryId?: string;
  onSelect(category: ProductCategory): void;
}

export default function CategoriesSection({
  $error,
  selectedCategoryId,
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

      <StyledSwiper
        spaceBetween={12}
        slidesPerView="auto"
        pagination={{ dynamicBullets: true }}
        modules={[Pagination]}
      >
        {isLoading && (
          <div className="categories-loader">
            <Loader size={14} $isLoading />
          </div>
        )}

        {!isLoading &&
          categories.map((categorie, key) => (
            <SwiperSlide key={key}>
              <Item
              $selected={categorie.id === selectedCategoryId}
              onClick={() => onSelect(categorie)}
              tabIndex={0} // Permite navegação por teclado
              onKeyDown={(e) => e.key === 'Enter' && onSelect(categorie)}
            >
              <span>{categorie.icon}</span>
              <span>{capitalizeFirstLetter(categorie.name)}</span>
            </Item>
            </SwiperSlide>
          ))}
      </StyledSwiper>
    </Container>
  );
}
