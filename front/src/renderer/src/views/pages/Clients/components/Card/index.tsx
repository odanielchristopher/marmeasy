import { Container, Footer, Header, Separator } from './styles';

interface CardProps {
  name: string;
  phone: string | number;
  address: string;
  ordersCount: number | string;
  balance: number;
}

export default function Card({ name, phone, address, ordersCount, balance }: CardProps) {
  return (
    <Container>
      <Header>
        <h2>{name}</h2>
        <p>{phone}</p>
        <Separator className="header" />
        <h3>Endereço</h3>
        <p>{address}</p>
      </Header>
      <Footer>
        <p>Totais de pedidos: {ordersCount}</p>
        <Separator className="footer" />
        <div className="ultimatefooter">
          <p>Saldo</p>
          <h3>R$ {balance}</h3>
        </div>
      </Footer>
    </Container>
  );
}
