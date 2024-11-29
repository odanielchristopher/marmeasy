import logo from '/logo.png?url';

import { GoHome } from 'react-icons/go';

import { Container } from './styles';

export default function Navigation(): JSX.Element {
  return (
    <Container>
      <img src={logo} alt="logo" />
      <GoHome size={40}/>
    </Container>
  );
}
