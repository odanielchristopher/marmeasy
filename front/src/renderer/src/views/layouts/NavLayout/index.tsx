import { Outlet } from 'react-router-dom';

import Navigation from '@renderer/views/components/Navigation';

import { ModalsProvider } from '@renderer/app/contexts/ModalsContext';

import { Container } from './styles';

export default function NavLayout() {


  return (
    <ModalsProvider>
        <Container>
          <Navigation />
          <Outlet />
        </Container>
    </ModalsProvider>
  );
}
