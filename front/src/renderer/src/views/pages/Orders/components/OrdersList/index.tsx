import { Client } from '@renderer/app/entities/Client';
import useAside from '@renderer/app/hooks/useAside';
import formatPhone from '@renderer/app/utils/formatPhone';
import { Container, Content, Left, Right } from './styles';

interface CardListProps {
  clients: Client[];
  onDeleteClient(client: Client): void;
}

export default function ClientList({ clients }: CardListProps) {
  const { handleShowClientData } = useAside();

  return (
    <>
      {clients.map((client) => (
        <Container key={client.id} onClick={() => handleShowClientData(client)}>
          <Content>
            <Left>
              <div className="infos">
                <div className="infos-left">
                  <strong>{client.name}</strong>
                  <span>
                    {client.type === 'FISICO' ? 'cliente' : 'empresa'}
                  </span>
                  <p>
                    {client.phone
                      ? formatPhone(client.phone ?? '')
                      : 'Sem telefone'}
                  </p>
                </div>
                <span>Qtd: {1}</span>
              </div>
            </Left>
            <Right>
              <div className="infos">
                <div className="infos-right">
                  <span className="date">17 de agosto</span>
                </div>
                <span className="price">R$ 15,00</span>
              </div>
            </Right>
          </Content>
        </Container>
      ))}
    </>
  );
}
