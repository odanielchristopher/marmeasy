import styled from 'styled-components';
import 'swiper/css';
import { Swiper } from 'swiper/react';

export const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: space-between;
  width: 100%;
  max-width: 1124px;
  margin-inline: auto;

`;

export const LogoContainer = styled.div`
  height: 5.6rem;
  width: 5.6rem;

  img {
    height: 100%;
    width: 100%;
  }
`;

export const OutletContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`;

export const StyledSwiper = styled(Swiper)`
  padding-block: 0.4rem;
  position: initial;
  width: 620px;
  margin: 0;

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
