import { Separator } from '@radix-ui/react-dropdown-menu';
import { Container, Footer, Header } from './styles';

interface Card {
  id: string | number;
  name: string;
  phone: string | number;
  address: string;
  ordersCount: number | string;
  balance: number | number;
}

interface CardListProps {
  cards: Card[];
}

export default function CardList({ cards }: CardListProps) {
  return (
    <>
      {cards.map((card) => (
        <Container key={card.id}>
          <Header>
            <h2>{card.name}</h2>
            <p>{card.phone}</p>
            <Separator className="header" />
            <h3>Endereço</h3>
            <p>{card.address}</p>
          </Header>
          <Footer>
            <p>Totais de pedidos: {card.ordersCount}</p>
            <Separator className="footer" />
            <div className="ultimatefooter">
              <p>Saldo</p>
              <h3>R$ {card.balance}</h3>
            </div>
          </Footer>
      </Container>
      ))}
    </>
  );
}
