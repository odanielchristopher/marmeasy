import { Outlet } from 'react-router-dom';

import Navigation from '@renderer/components/Navigation';

import { Container } from './styles';

export default function NavLayout() {
  return (
    <Container>
      <Navigation />
      <Outlet />
    </Container>
  );
}
