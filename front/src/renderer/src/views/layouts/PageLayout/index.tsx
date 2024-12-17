import { Outlet, useLocation } from 'react-router-dom';

import { AsideProvider } from '@renderer/app/contexts/AsideContext';
import { ModalsProvider } from '@renderer/app/contexts/ModalsContext';

import ProfileModal from '@renderer/views/modals/ProfileModal';

import Aside from './components/Aside';
import Navigation from './components/Navigation';

import { Container, Main } from './styles';

export default function NavLayout() {
  const location = useLocation();

  const showAside = ['/', '/orders'].includes(location.pathname);

  return (
    <ModalsProvider>
      <AsideProvider>
        <ProfileModal />
        <Container $showAside={showAside} >
          <Navigation $area='nav'/>
          <Main>
            <Outlet />
          </Main>
          {showAside && <Aside area="aside" />}
        </Container>
      </AsideProvider>
    </ModalsProvider>
  );
}
