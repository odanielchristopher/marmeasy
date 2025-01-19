import { TbUsers } from 'react-icons/tb';

import Fab from '@renderer/views/components/Fab';
import Select from '@renderer/views/components/Select';
import Button from '@renderer/views/components/Button';

import { Container, Content, Header, NotFoundContainer } from './styles';

import ClientList from './components/OrdersList';

import notFoundImage from '@renderer/assets/Images/NotFound.svg';
import Loader from '@renderer/views/components/Loader';
import DeleteModal from '@renderer/views/modals/DeleteModal';
import useClients from './useClients';

export default function Clients() {
  const {
    handleOnConfirmDeleteClient,
    handleCloseDeleteClientModal,
    handleDeleteClient,
    hasClient,
    isDeleteClientModalVisible,
    clientBeingDeleted,
    isLoading,
    isSearchEmpty,
    filteredClients,
  } = useClients();

  return (
    <Container>
      <DeleteModal
        onConfirm={handleOnConfirmDeleteClient}
        open={isDeleteClientModalVisible}
        onClose={handleCloseDeleteClientModal}
        answer={
          clientBeingDeleted?.type === 'FISICO'
            ? 'Tem certeza que deseja excluir esse cliente?'
            : 'Tem certeza que deseja excluir essa empresa?'
        }
        description={
          clientBeingDeleted?.type === 'FISICO'
            ? 'Todos os dados relacionados a esse cliente serão apagados e não poderão ser recuperados.'
            : 'Todos os dados relacionados a essa empresa serão apagados e não poderão ser recuperados.'
        }
      />

      <Fab />

      <Header>
        <div>
          <TbUsers size={32} />
          <h1>Pedidos</h1>
        </div>
        <p>Gerencie os pedidos feitos pelos seus clientes</p>
      </Header>

      <div className="align-container">
        <Select
          placeholder="Escolha o cliente"
          options={[
            { value: 'FISICO', label: 'Cliente' },
            { value: 'JURIDICO', label: 'Empresa' },
          ]}
        />
        <div className="date-container">
          <p>Escolha um período</p>
        </div>
      </div>


      {isLoading && <Loader $isLoading size={50} />}

      {!isLoading && (
        <Content>
          {hasClient && (
            <ClientList onDeleteClient={handleDeleteClient} clients={filteredClients} />
          )}

          {isSearchEmpty && (
            <NotFoundContainer>
              <img src={notFoundImage} alt="Clientes não encontrados" />
              <p>Não encontramos nenhum cliente!</p>
            </NotFoundContainer>
          )}
        </Content>
      )}
    </Container>
);
}
