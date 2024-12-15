import { TbUsers } from 'react-icons/tb';

import Fab from '@renderer/views/components/Fab';

import { Container, Header, Content, Card, DivFooter, DivHeader, Separator, Main } from './styles';
import Aside from '@renderer/views/components/Aside';

const cards = [
  { name: 'Kleyton', phone: 8812121212, address: 'Rua 8, Centro - Quixada', ordersNumber: 12, balance: 40.52},
  { name: 'Kleyton', phone: 8812121212, address: 'Rua 8, Centro - Quixada', ordersNumber: 12, balance: 40.52},
  { name: 'Kleyton', phone: 8812121212, address: 'Rua 8, Centro - Quixada', ordersNumber: 12, balance: 40.12},
  { name: 'Kleyton', phone: 8812121212, address: 'Rua 8, Centro - Quixada', ordersNumber: 12, balance: 40.52},
  { name: 'Kleyton', phone: 8812121212, address: 'Rua 8, Centro - Quixada', ordersNumber: 12, balance: 40.52},
  { name: 'Kleyton', phone: 8812121212, address: 'Rua 8, Centro - Quixada', ordersNumber: 12, balance: 40.12},
  { name: 'Kleyton', phone: 8812121212, address: 'Rua 8, Centro - Quixada', ordersNumber: 12, balance: 40.52},
  { name: 'Kleyton', phone: 8812121212, address: 'Rua 8, Centro - Quixada', ordersNumber: 12, balance: 40.52},
  { name: 'Kleyton', phone: 8812121212, address: 'Rua 8, Centro - Quixada', ordersNumber: 12, balance: 40.12},
  { name: 'Kleyton', phone: 8812121212, address: 'Rua 8, Centro - Quixada', ordersNumber: 12, balance: 40.52},
  { name: 'Kleyton', phone: 8812121212, address: 'Rua 8, Centro - Quixada', ordersNumber: 12, balance: 40.52},
  { name: 'Kleyton', phone: 8812121212, address: 'Rua 8, Centro - Quixada', ordersNumber: 12, balance: 40.12},
  { name: 'Kleyton', phone: 8812121212, address: 'Rua 8, Centro - Quixada', ordersNumber: 12, balance: 40.52},
  { name: 'Kleyton', phone: 8812121212, address: 'Rua 8, Centro - Quixada', ordersNumber: 12, balance: 40.52},
  { name: 'Kleyton', phone: 8812121212, address: 'Rua 8, Centro - Quixada', ordersNumber: 12, balance: 40.12},
];


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
            <p>
              Gerencie os clientes do seu estabelecimento
            </p>
          </Header>
          <Content>
            {cards.map((card, key) => (
              <Card key={key}>
              <DivHeader>
                <h2>{card.name}</h2>
                <p>{card.phone}</p>
                <Separator className='header'/>
                <h3>Endereço</h3>
                <p>{card.address}</p>
              </DivHeader>
              <DivFooter>  
                <p>Totais de pedidos: {card.ordersNumber}</p>
                <Separator className='footer' />
                  <div className="ultimatefooter">
                    <p>Saldo</p>
                  <h3>R$ {card.balance}</h3>
                  </div>
              </DivFooter>
            </Card>
            ))}
          </Content>
        </Main>
      <Aside />
    </Container>
  );
}
