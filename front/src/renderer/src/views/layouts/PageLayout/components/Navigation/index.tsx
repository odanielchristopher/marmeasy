import logo from '/logo.png?url';

import { BiFoodMenu } from 'react-icons/bi';
import { LuLogOut } from 'react-icons/lu';
import { PiUserCircle } from 'react-icons/pi';
import { TbUsers } from 'react-icons/tb';

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
  $area: string
}

export default function Navigation({ $area }: NavigationProps) {
  const { handleLogOutLink, handleProfileLink } = useNavigation();

  return (
    <Container $area={$area}>
      <LogoContainer>
        <img src={logo} alt="logo" />
      </LogoContainer>

      <MainContainer>
        <StyledLink type="button" to={'/'}>
          <TbUsers size={32} />
          <span>Clientes</span>
        </StyledLink>

        <StyledLink type="button" to={'/orders'}>
          <OrdersIcon />
          <span>Pedidos</span>
        </StyledLink>

        <StyledLink type="button" to={'/menu'}>
          <BiFoodMenu size={32} />
          <span>Cardápio</span>
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
