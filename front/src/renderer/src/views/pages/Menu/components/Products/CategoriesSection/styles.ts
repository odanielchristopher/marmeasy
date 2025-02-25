import styled, { css } from 'styled-components';

import 'swiper/css';
import { Swiper } from 'swiper/react';

export const StyledSwiper = styled(Swiper)`
  padding-block: 0.4rem;
  position: initial;

  .categories-loader {
    width: 42rem;
    height: 4.8rem;
  }

  .swiper-pagination {
    bottom: -10px;

    .swiper-pagination-bullet-active {
      background-color: ${({ theme }) =>
        theme.colors.orange.main}; /* Cor do bullet ativo */
    }
  }

  .swiper-slide {
    width: fit-content;
  }
`;

export const Container = styled.section`
  max-width: 42rem;

  position: relative;
  header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.2rem;

    .title {
      color: ${({ theme }) => theme.colors.gray.light};
      font-size: 1.4rem;
      line-height: 150%;
    }

    .error {
      align-items: center;
      color: ${({ theme }) => theme.colors.red.dark};
      display: flex;
      font-size: 1.2rem;
      gap: 0.6rem;
      margin-top: 0.2rem;
    }
  }
`;

interface CategoryItemProps {
  $selected?: boolean;
}

export const Item = styled.div<CategoryItemProps>`
  align-items: center;
  border-radius: 7.5rem;
  border: 1px solid transparent;
  box-shadow: 0rem 0rem 0.3rem 0rem rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.1rem 1.4rem;

  cursor: pointer;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.orange.main};
  }

  ${({ theme, $selected }) =>
    $selected &&
    css`
      border: 1px solid ${theme.colors.orange.main};
    `}
`;
