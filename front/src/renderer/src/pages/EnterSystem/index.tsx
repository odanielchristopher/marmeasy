
import useEnterSystem from './useEnterSystem';

import Login from './components/Login';
import Register from './components/Register';

import { Container } from './styles';

export default function EnterSystem(): JSX.Element {
  const {  isRegistered, handleViewingLoginOrRegisterComponent } = useEnterSystem();

  return (
    <Container>
      {isRegistered ?
      <Login
        handleViewing={handleViewingLoginOrRegisterComponent}
      /> :
      <Register
        handleViewing={handleViewingLoginOrRegisterComponent}
      />}
    </Container>
  );
}
