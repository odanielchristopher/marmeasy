import { Outlet, useLocation } from 'react-router-dom';

import Navigation from '@renderer/views/components/Navigation';

import { ModalsProvider } from '@renderer/app/contexts/ModalsContext';

import ProfileModal from '@renderer/views/modals/ProfileModal';

import Aside from '@renderer/views/components/Aside';
import { Container, Main } from './styles';

export default function NavLayout() {
  const location = useLocation();

  const showAside = ['/', '/orders'].includes(location.pathname);

  return (
    <ModalsProvider>
        <ProfileModal />
        <Container $showAside={showAside} >
          <Navigation $area='nav'/>
          <Main>
            <Outlet />
          </Main>
          {showAside && <Aside area="aside" />}
        </Container>
    </ModalsProvider>
  );
}
