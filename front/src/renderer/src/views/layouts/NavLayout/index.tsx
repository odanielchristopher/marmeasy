import { Outlet } from 'react-router-dom';

import Navigation from '@renderer/views/components/Navigation';

import { ModalsProvider } from '@renderer/app/contexts/ModalsContext';

import ProfileModal from '@renderer/views/modals/ProfileModal';
import { Container } from './styles';

export default function NavLayout() {
  return (
    <ModalsProvider>
      <ProfileModal />
      <Container>
        <Navigation />
        <Outlet />
      </Container>
    </ModalsProvider>
  );
}
