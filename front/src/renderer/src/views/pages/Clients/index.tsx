import { TbUsers } from 'react-icons/tb';

import Fab from '@renderer/views/components/Fab';
import { IoIosSearch } from 'react-icons/io';

import { clientsService } from '@renderer/app/services/clientsService';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Content,
  Header,
  InputContainer,
  NotFoundContainer,
  SearchInput,
} from './styles';

import { Client } from '@renderer/app/entities/Client';
import formatPhone from '@renderer/app/utils/formatPhone';
import CardList from './components/CardList';

import notFoundImage from '@renderer/assets/Images/NotFound.svg';
import Loader from '@renderer/views/components/Loader';

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['clients', 'getAll'],
    queryFn: async () => {
      return await clientsService.getAll();
    },
    staleTime: 10000,
  });

  function loadClient() {
    setClients(data ?? []);
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  const filteredClients = useMemo(
    () =>
      clients.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [clients, searchTerm],
  );
  const isSearchEmpty = filteredClients.length < 1;
  const hasClient = filteredClients.length > 0;

  useEffect(() => {
    loadClient();
  }, [data]);

  return (
    <Container>
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

      {isLoading && <Loader $isLoading size={50} />}

      {!isLoading && (
        <Content>

          {isSearchEmpty && (
            <NotFoundContainer>
              <img src={notFoundImage} alt="Clientes não encontrados" />
              <p>Não encontramos nenhum cliente!</p>
            </NotFoundContainer>
          )}


          {hasClient && (
            <CardList
              cards={filteredClients.map((client) => ({
                id: client.id,
                name: client.name,
                address: client.address,
                phone: formatPhone(client.phone ?? ''),
                balance: client.balance as number,
                ordersCount: 12,
              }))}
            />
          )}
        </Content>
      )}
    </Container>
  );
}
