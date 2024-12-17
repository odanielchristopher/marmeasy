import { Separator } from '@radix-ui/react-dropdown-menu';
import { Client } from '@renderer/app/entities/Client';
import useAside from '@renderer/app/hooks/useAside';
import formatPhone from '@renderer/app/utils/formatPhone';
import { Container, Footer, Header } from './styles';


interface CardListProps {
  clients: Client[];
}

export default function CardList({ clients }: CardListProps) {
  const { handleShowClientData } = useAside();

  return (
    <>
      {clients.map((client) => (
        <Container key={client.id} onClick={() => handleShowClientData(client)}>
          <Header>
            <h2>{client.name}</h2>
            <p>{formatPhone(client.phone ?? '')}</p>
            <Separator className="header" />
            <h3>Endereço</h3>
            <p>{client.address}</p>
          </Header>
          <Footer>
            <p>Totais de pedidos: 0</p>
            <Separator className="footer" />
            <div className="ultimatefooter">
              <p>Saldo</p>
              <h3>R$ {client.balance}</h3>
            </div>
          </Footer>
      </Container>
      ))}
    </>
  );
}
