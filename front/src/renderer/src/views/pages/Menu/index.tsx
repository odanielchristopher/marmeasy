
import { BiFoodMenu } from 'react-icons/bi';

import working from '@renderer/assets/Images/working.svg';

import { Container, Header, Main } from './styles';

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

      <Main>
        <img src={working} alt="" />
        <span>Estamos trabalhando nisso</span>
      </Main>
    </Container>
  );
}
