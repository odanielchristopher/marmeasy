
import logo from '/logo.png?url';

import { BiFoodMenu } from 'react-icons/bi';
import { LuLogOut } from 'react-icons/lu';
import { PiUserCircle } from 'react-icons/pi';
import { TbUsers } from 'react-icons/tb';

import { Container, FootContainer, LinkNavigation, LogoContainer, MainContainer } from './styles';
import useNavigation from './useNavigation';


export default function Navigation() {
  const {
    handleClientsLink,
    handleLogOutLink,
    handleMenuLink,
    handleProfileLink,
  } = useNavigation();

  return (
    <Container>
      <LogoContainer>
        <img src={logo} alt="logo" />
      </LogoContainer>

      <MainContainer>
        <LinkNavigation type="button" onClick={handleClientsLink}>
          <TbUsers size={32} />
          <span>Clientes</span>
        </LinkNavigation>

        <LinkNavigation type="button" onClick={handleMenuLink}>
          <BiFoodMenu size={32} />
          <span>Cardápio</span>
        </LinkNavigation>
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
