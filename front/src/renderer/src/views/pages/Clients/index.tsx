import { TbUsers } from 'react-icons/tb';

import Fab from '@renderer/views/components/Fab';
import SearchInput from '@renderer/views/components/SearchInput';

import { Container, Content, NotFoundContainer } from './styles';

import ClientList from './components/ClientList';

import notFoundImage from '@renderer/assets/Images/NotFound.svg';
import Loader from '@renderer/views/components/Loader';
import { SectionHeader } from '@renderer/views/components/SectionHeader';
import useClients from './useClients';

export default function Clients() {
  const {
    handleChangeSearchTerm,
    hasClient,
    isLoading,
    isSearchEmpty,
    searchTerm,
    filteredClients,
  } = useClients();

  return (
    <Container>
      <Fab />

      <SectionHeader>
        <div>
          <TbUsers size={32} />
          <h1>Clientes</h1>
        </div>
        <p>Gerencie os clientes do seu estabelecimento</p>
      </SectionHeader>

      <SearchInput
        placeholder="Pesquisa por nome..."
        value={searchTerm}
        onValueChange={handleChangeSearchTerm}
      />

      {isLoading && <Loader $isLoading size={50} />}

      {!isLoading && (
        <Content>
          {hasClient && <ClientList clients={filteredClients} />}

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
