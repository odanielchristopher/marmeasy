import styled, { keyframes } from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper } from 'swiper/react';

const outletIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

const sliderIn = keyframes`
  from {
    transform: translateX(200px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: space-between;
  gap: 2.4rem;
  max-width: 1224px;
  margin-inline: auto;
  padding: 2.4rem;
  width: 100%;

  @media (max-width: 998px) {
    justify-content: center;
  }
`;

export const OutletContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;

  animation: ${outletIn} ease-in 300ms forwards;
`;

export const LogoContainer = styled.div`
  height: 5.6rem;
  width: 5.6rem;

  img {
    height: 100%;
    width: 100%;
  }
`;

export const StyledSwiper = styled(Swiper)`
  padding-block: 0.4rem;
  position: relative;
  width: 620px;
  margin: 0;

  animation: ${sliderIn} ease-in 300ms forwards;

  .swiper-pagination {
    .swiper-pagination-bullet {
      width: 1.2rem;
      height: 1.2rem;
      transition: all ease 100ms;
    }

    .swiper-pagination-bullet-active {
      background-color: ${({ theme }) => theme.colors.orange.light};
      transform: scale(140%);
    }
  }

  .swiper-slide {
    width: fit-content;
  }

  @media (max-width: 998px) {
    display: none;
  }
`;

export const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SloganContainer = styled.div`
  background-color: #fff;
  border-end-end-radius: 4rem;
  border-end-start-radius: 4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 4rem;
  width: 100%;

  h3 {
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 140%;
  }

  p {
    color: #808080;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 140%;
  }
`;
