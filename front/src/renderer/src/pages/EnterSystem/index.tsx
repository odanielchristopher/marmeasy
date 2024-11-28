
import useEnterSystem from './useEnterSystem';

import Login from './components/Login';
import Register from './components/Register';

import { Container } from './styles';

export default function EnterSystem(): JSX.Element {
  const {  isRegistered, handleToogleView } = useEnterSystem();

  return (
    <Container>
      {isRegistered ?
      <Login
        handleViewing={handleToogleView}
      /> :
      <Register
        handleViewing={handleToogleView}
      />}
    </Container>
  );
}
