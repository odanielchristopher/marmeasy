import useEnterSystem from './useEnterSystem';

import Login from './components/Login';
import Register from './components/Register';

import { Container } from './styles';

export default function EnterSystem(): JSX.Element {
  const {  isRegistered, setIsRegistered, handleToogleView } = useEnterSystem();

  return (
    <Container>
      {isRegistered ?
      <Login
        handleViewing={handleToogleView}
      /> :
      <Register
        handleViewing={handleToogleView}
        onRegister={setIsRegistered}
      />}
    </Container>
  );
}
