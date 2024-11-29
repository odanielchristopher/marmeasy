import logo from '@renderer/assets/images/logo.png';

import { Container } from './styles';

export default function Navigation(): JSX.Element {
  return (
    <Container>
      <img src={logo} alt="Marmeasy" />
    </Container>
  );
}
