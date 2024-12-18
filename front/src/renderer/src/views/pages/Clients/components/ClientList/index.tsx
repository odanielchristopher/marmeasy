import { Client } from '@renderer/app/entities/Client';
import useAside from '@renderer/app/hooks/useAside';
import formatPhone from '@renderer/app/utils/formatPhone';
import { DeleteIcon } from '@renderer/assets/Icons/DeleteIcon';
import { Container, Content, Footer, Header, Main } from './styles';

interface CardListProps {
  clients: Client[];
  onDeleteClient(client: Client): void;
}

export default function ClientList({ clients, onDeleteClient }: CardListProps) {
  const { handleShowClientData, handleHiddenClientData } = useAside();

  return (
    <>
      {clients.map((client) => (
        <Container key={client.id}>
          <button onClick={() => {
            onDeleteClient(client);
            handleHiddenClientData();
          }} className="deleteButton">
            <DeleteIcon />
          </button>
          <Content onClick={() => handleShowClientData(client)}>
            <Header>
              <div className="infos">
                <strong>{client.name}</strong>
                <span>{formatPhone(client.phone ?? '')}</span>
              </div>
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
          </Content>
        </Container>
      ))}
    </>
  );
}
