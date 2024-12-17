import { Separator } from '@radix-ui/react-dropdown-menu';
import useAside from '@renderer/app/hooks/useAside';
import { Container, Footer, Header } from './styles';

interface Card {
  id: string;
  name: string;
  phone?: string | number;
  address?: string;
  ordersCount: number | string;
  balance?: number;
}

interface CardListProps {
  cards: Card[];
}

export default function CardList({ cards }: CardListProps) {
  const { handleShowClientData } = useAside();

  return (
    <>
      {cards.map((card) => (
        <Container key={card.id} onClick={() => handleShowClientData(card.id)}>
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
