import { TbUsers } from 'react-icons/tb';

import Fab from '@renderer/views/components/Fab';

import { Container, Header } from './styles';

export default function Clients() {
  return (
    <Container>
      <Fab />
      <Header>
        <div>
          <TbUsers size={32} />
          <h1>Clientes</h1>
        </div>

        <p>Gerencie os clientes do seu estabelecimento</p>
      </Header>
    </Container>
  );
}
