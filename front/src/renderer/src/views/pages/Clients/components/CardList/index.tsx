import { Client } from '@renderer/app/entities/Client';
import useAside from '@renderer/app/hooks/useAside';
import formatPhone from '@renderer/app/utils/formatPhone';
import { DeleteIcon } from '@renderer/assets/Icons/DeleteIcon';
import { Container, Footer, Header, Main } from './styles';

interface CardListProps {
  clients: Client[];
  onDeleteClient(client: Client): void;
}

export default function CardList({ clients, onDeleteClient }: CardListProps) {
  const { handleShowClientData } = useAside();


  return (
    <>
      {clients.map((client) => (
        <Container key={client.id} onClick={() => handleShowClientData(client)}>
          <Header>
            <div className="infos">
              <strong>{client.name}</strong>
              <span>{formatPhone(client.phone ?? '')}</span>
            </div>
            <button onClick={() => onDeleteClient(client)} className="deleteButton">
              <DeleteIcon />
            </button>
          </Header>
          <Main>
            <div className="top">
              <strong>Endereço</strong>
              <span>{client.address ?? 'Sem endereço'}</span>
            </div>

            <div className="bottom">
              <span>Totais de pedidos: {21}</span>
            </div>
          </Main>
          <Footer>
            <span>Saldo</span>

            <strong>R$ {client.balance}</strong>
          </Footer>
        </Container>
      ))}
    </>
  );
}
