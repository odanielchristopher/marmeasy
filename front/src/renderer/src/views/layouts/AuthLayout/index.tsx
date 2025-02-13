import { Outlet } from 'react-router-dom';
import logo from '/logo.png?url';

import imgDashboard from '@renderer/assets/Images/img-dashboard.svg';
import imgOrders from '@renderer/assets/Images/img-orders.svg';

import {
  Container,
  LogoContainer,
  OutletContainer,
  StyledSwiper,
} from './styles';

import { SwiperSlide } from 'swiper/react';

export function AuthLayout() {
  return (
    <Container>
      <OutletContainer>
        <LogoContainer>
          <img src={logo} alt="logo" />
        </LogoContainer>
        <Outlet />
      </OutletContainer>

      <StyledSwiper spaceBetween={50} slidesPerView={1}>
        <SwiperSlide>
          <img src={imgOrders} alt="Organize seus pedidos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imgDashboard} alt="Organize seus pedidos" />
        </SwiperSlide>
      </StyledSwiper>
    </Container>
  );
}
