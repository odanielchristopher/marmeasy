

import Navigation from '@renderer/components/Navigation';
import { Container } from './styles';

export default function EnterSystem(): JSX.Element {
  // const {  isRegistered, handleToogleView } = useEnterSystem();

  return (
    <Container>
      {/* {isRegistered ?
      <Login
        handleViewing={handleToogleView}
      /> :
      <Register
        handleViewing={handleToogleView}
      />} */}
      <Navigation />
    </Container>
  );
}
