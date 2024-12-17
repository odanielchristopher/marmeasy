import { TbUsers } from 'react-icons/tb';

import Fab from '@renderer/views/components/Fab';
import { IoIosSearch } from 'react-icons/io';

import {
  Container,
  Content,
  Header,
  InputContainer,
  NotFoundContainer,
  SearchInput,
} from './styles';

import CardList from './components/CardList';

import notFoundImage from '@renderer/assets/Images/NotFound.svg';
import Loader from '@renderer/views/components/Loader';
import DeleteModal from '@renderer/views/modals/DeleteModal';
import useClients from './useClients';

export default function Clients() {
  const {
    handleOnConfirmDeleteClient,
    handleCloseDeleteClientModal,
    handleDeleteClient,
    handleChangeSearchTerm,
    hasClient,
    isDeleteClientModalVisible,
    isFetching,
    isSearchEmpty,
    searchTerm,
    filteredClients,
  } = useClients();

  return (
    <Container>

      <DeleteModal
        onConfirm={handleOnConfirmDeleteClient}
        open={isDeleteClientModalVisible}
        onClose={handleCloseDeleteClientModal}
        answer={`
          Tem ceteza que deseja excluir esse cliente?
        `}
        description={`
          Todos os dados relacionados a esse cliente
          serão apagados e não poderão ser recuperados.
        `}
      />


      <Fab />

      <Header>
        <div>
          <TbUsers size={32} />
          <h1>Clientes</h1>
        </div>
        <p>Gerencie os clientes do seu estabelecimento</p>
      </Header>

      <InputContainer>
        <IoIosSearch size={28} />
        <SearchInput
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </InputContainer>

      {isFetching && <Loader $isLoading size={50} />}

      {!isFetching && (
        <Content>
          {hasClient && (
            <CardList
              onDeleteClient={handleDeleteClient}
              clients={filteredClients}
            />
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
