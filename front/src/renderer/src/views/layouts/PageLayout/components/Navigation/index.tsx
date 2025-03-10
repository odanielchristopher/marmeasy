import logo from '/logo.png?url';

import { BiFoodMenu } from 'react-icons/bi';
import { LuLogOut } from 'react-icons/lu';
import { PiUserCircle } from 'react-icons/pi';
import { TbUsers } from 'react-icons/tb';

import { DashboardIcon } from '@renderer/assets/Icons/DashboardIcon';
import { OrdersIcon } from '@renderer/assets/Icons/OrdersIcon';
import {
  Container,
  FootContainer,
  LinkNavigation,
  LogoContainer,
  MainContainer,
  StyledLink,
} from './styles';
import useNavigation from './useNavigation';

interface NavigationProps {
  $area: string;
}

export default function Navigation({ $area }: NavigationProps) {
  const { handleLogOutLink, handleProfileLink, pathname } = useNavigation();

  return (
    <Container $area={$area}>
      <LogoContainer>
        <img src={logo} alt="logo" />
      </LogoContainer>

      <MainContainer>
        <StyledLink type="button" to={'/'} $active={pathname == '/'}>
          <OrdersIcon />
          <span>Pedidos</span>
        </StyledLink>

        <StyledLink
          type="button"
          to={'/clients'}
          $active={pathname === '/clients'}
        >
          <TbUsers size={32} />
          <span>Clientes</span>
        </StyledLink>

        <StyledLink type="button" to={'/menu'} $active={pathname === '/menu'}>
          <BiFoodMenu size={32} />
          <span>Cardápio</span>
        </StyledLink>

        <StyledLink
          type="button"
          to={'/dashboard'}
          $active={pathname === '/dashboard'}
        >
          <DashboardIcon />
          <span>Relatórios</span>
        </StyledLink>
      </MainContainer>

      <FootContainer>
        <LinkNavigation type="button" onClick={handleProfileLink}>
          <PiUserCircle size={32} />
          <span>Perfil</span>
        </LinkNavigation>

        <LinkNavigation type="button" onClick={handleLogOutLink}>
          <LuLogOut size={32} />
          <span>Sair</span>
        </LinkNavigation>
      </FootContainer>
    </Container>
  );
}
