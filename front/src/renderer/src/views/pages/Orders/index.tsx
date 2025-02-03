import { TbUsers } from 'react-icons/tb';

import Fab from '@renderer/views/components/Fab';

import { Container, Content, Header, NotFoundContainer } from './styles';

import ClientList from './components/OrdersList';

import notFoundImage from '@renderer/assets/Images/NotFound.svg';
import DateRangePickerInput from '@renderer/views/components/DateRangePickerInput';
import Loader from '@renderer/views/components/Loader';
import SearchInput from '@renderer/views/components/SearchInput';
import useClients from './useClients';

export default function Clients() {
  const {
    handleDeleteClient,
    hasClient,
    selectedDateRange,
    handleSelectedDateRange,
    isLoading,
    isSearchEmpty,
    filteredClients,
    handleChangeSearchTerm,
    searchTerm,
  } = useClients();

  return (
    <Container>
      <Fab />

      <Header>
        <div>
          <TbUsers size={32} />
          <h1>Pedidos</h1>
        </div>
        <p>Gerencie os pedidos feitos pelos seus clientes</p>
      </Header>

      <div className="filters">
        <SearchInput
          placeholder="Pesquisa por nome..."
          value={searchTerm}
          onValueChange={handleChangeSearchTerm}
        />

        <DateRangePickerInput
          value={selectedDateRange}
          onChange={handleSelectedDateRange}
        />
      </div>

      {isLoading && <Loader $isLoading size={50} />}

      {!isLoading && (
        <Content>
          {hasClient && (
            <ClientList
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
