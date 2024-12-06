import { Outlet } from 'react-router-dom';

import { Container } from './styles';

export function AuthLayout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
