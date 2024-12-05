
import { BiFoodMenu } from 'react-icons/bi';
import { Container, Header } from './styles';

export default function Menu() {
  return (
    <Container>
      <Header>
        <div>
          <BiFoodMenu size={32}/>
          <h1>Cardápio</h1>
        </div>

        <p>
          Gerencie os produtos do seu estabelecimento
        </p>
      </Header>
    </Container>
  );
}
