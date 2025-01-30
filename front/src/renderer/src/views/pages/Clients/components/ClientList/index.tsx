import { Client } from '@renderer/app/entities/Client';
import useAside from '@renderer/app/hooks/useAside';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import formatPhone from '@renderer/app/utils/formatPhone';
import { useState } from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import EditClientModal from '../modals/EditClientModal';
import {
  Container,
  Content,
  EditButton,
  Footer,
  Header,
  ListContainer,
  Main,
} from './styles';

interface ClientListProps {
  clients: Client[];
}

export default function ClientList({ clients }: ClientListProps) {
  const { handleShowClientData, handleHiddenClientData } = useAside();

  const [isOpenEditClientModal, setIsOpenEditClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  function handleOpenEditClientModal(client: Client) {
    setSelectedClient(client);
    setIsOpenEditClientModal(true);
  }
  function handleCloseEditClientModal() {
    setSelectedClient(null);
    setIsOpenEditClientModal(false);
  }

  return (
    <>
      <EditClientModal
        isOpen={isOpenEditClientModal}
        client={selectedClient}
        onClose={handleCloseEditClientModal}
      />
      <ListContainer>
        {clients.map((client) => (
          <Container key={client.id}>
            <EditButton
              type="button"
              onClick={() => {
                handleHiddenClientData();
                handleOpenEditClientModal(client);
              }}
            >
              <HiOutlinePencilAlt size={24} />
            </EditButton>
            <Content onClick={() => handleShowClientData(client)}>
              <Header>
                <div className="infos">
                  <div className="infos-header">
                    <strong>{client.name}</strong>
                    <span>
                      {client.type === 'FISICO' ? 'cliente' : 'empresa'}
                    </span>
                  </div>
                  <span>
                    {client.phone
                      ? formatPhone(client.phone ?? '')
                      : 'Sem telefone'}
                  </span>
                </div>
              </Header>
              <Main>
                <div className="top">
                  <strong>Endereço</strong>
                  <span>{client.address ?? 'Sem endereço'}</span>
                </div>

                <div className="bottom">
                  <span>Total de pedidos: {21}</span>
                </div>
              </Main>
              <Footer>
                <span>Saldo</span>

                <strong>R$ {formatCurrency(client.balance as number)}</strong>
              </Footer>
            </Content>
          </Container>
        ))}
      </ListContainer>
    </>
  );
}
