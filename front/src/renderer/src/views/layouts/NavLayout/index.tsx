import { Outlet } from 'react-router-dom';

import Navigation from '@renderer/views/components/Navigation';

import { ModalsProvider } from '@renderer/app/contexts/ModalsContext';
import Profile from '@renderer/views/pages/Profile';
import { Container } from './styles';

export default function NavLayout() {
  return (
    <ModalsProvider>
      <Container>
        <Profile />
        <Navigation />
        <Outlet />
      </Container>
    </ModalsProvider>
  );
}
