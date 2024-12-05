import { TbUsers } from 'react-icons/tb';

import { Container, Header } from './styles';

export default function Clients(): JSX.Element {
  return (
    <Container>
      <Header>
        <div>
          <TbUsers size={32} />
          <h1>Clientes</h1>
        </div>

        <p>
          Gerencie os clientes do seu estabelecimento
        </p>
      </Header>
    </Container>
  );
}
