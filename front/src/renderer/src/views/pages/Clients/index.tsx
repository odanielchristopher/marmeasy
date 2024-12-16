import { TbUsers } from 'react-icons/tb';

import Fab from '@renderer/views/components/Fab';

import Select from '@renderer/views/components/Select';
import { Container, Header, Main } from './styles';

// const cards = [
//   {
//     id: Math.random(),
//     name: 'Kleyton',
//     phone: 8812121212,
//     address: 'Rua 8, Centro - Quixada',
//     ordersCount: 12,
//     balance: 40.52,
//   },
//   {
//     id: Math.random(),
//     name: 'Kleyton',
//     phone: 8812121212,
//     address: 'Rua 8, Centro - Quixada',
//     ordersCount: 12,
//     balance: 40.52,
//   },
//   {
//     id: Math.random(),
//     name: 'Kleyton',
//     phone: 8812121212,
//     address: 'Rua 8, Centro - Quixada',
//     ordersCount: 12,
//     balance: 40.52,
//   },
// ];

export default function Clients() {
  return (
    <Container>
      <Main>
        <Fab />
        <Header>
          <div>
            <TbUsers size={32} />
            <h1>Clientes</h1>
          </div>
          <p>Gerencie os clientes do seu estabelecimento</p>
        </Header>
        {/* <Content>
          <CardList cards={cards}/>
        </Content> */}

        <Select
          placeholder='Cliente'
          options={[
            {
              label: 'Daniel',
              value: 'dani',
            },
            {
              label: 'Ellen',
              value: 'ellen',
            },
            {
              label: 'Kleyton',
              value: 'kleytin',
            },
          ]}
        />
      </Main>
    </Container>
  );
}
