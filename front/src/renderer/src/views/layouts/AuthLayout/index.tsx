import { Outlet } from 'react-router-dom';
import logo from '/logo.png?url';

import imgDashboard from '@renderer/assets/Images/slide-dashboard-img.svg';
import imgOrders from '@renderer/assets/Images/slide-orders-img.svg';

import {
  Container,
  LogoContainer,
  OutletContainer,
  SlideContainer,
  SloganContainer,
  StyledSwiper,
} from './styles';

import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

export function AuthLayout() {
  const swiperRef = useRef<Swiper | null>(null);
  const [nextSlideIndex, setNextSlideIndex] = useState(1);

  useEffect(() => {
    const timeoutIndex = setTimeout(() => {
      if (!swiperRef.current) {
        return;
      }

      swiperRef.current.slideTo(nextSlideIndex, 500, true);
    }, 5000);

    return () => {
      clearTimeout(timeoutIndex);
    };
  }, [nextSlideIndex]);

  function handleNextSlideIndex() {
    setNextSlideIndex((prevState) => (prevState === 0 ? 1 : 0));
  }

  return (
    <Container>
      <OutletContainer>
        <LogoContainer>
          <img src={logo} alt="logo" />
        </LogoContainer>
        <Outlet />
      </OutletContainer>

      <StyledSwiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleNextSlideIndex}
      >
        <SwiperSlide>
          <SlideContainer>
            <img src={imgOrders} alt="Organize seus pedidos" />
            <SloganContainer>
              <h3>Organize os seus pedidos!</h3>
              <p>
                Gerencie os pedidos feitos no seu estabelecimento de forma
                fácil!
              </p>
            </SloganContainer>
          </SlideContainer>
        </SwiperSlide>

        <SwiperSlide>
          <SlideContainer>
            <img src={imgDashboard} alt="Organize seus pedidos" />

            <SloganContainer>
              <h3>Gerencie suas despesas!</h3>
              <p>
                Faça o controle das finanças de sua empresa com simplicidade!
              </p>
            </SloganContainer>
          </SlideContainer>
        </SwiperSlide>
      </StyledSwiper>
    </Container>
  );
}
