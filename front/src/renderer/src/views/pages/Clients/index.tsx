import { TbUsers } from 'react-icons/tb';

import Fab from '@renderer/views/components/Fab';

import { clientsService } from '@renderer/app/services/clientsService';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Container, Content, Header, NotFoundContainer } from './styles';

import { Client } from '@renderer/app/entities/Client';
import formatPhone from '@renderer/app/utils/formatPhone';
import Select from '@renderer/views/components/Select';
import CardList from './components/CardList';

import notFoundImage from '@renderer/assets/Images/NotFound.svg';
import Loader from '@renderer/views/components/Loader';

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);

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

      <Select
        placeholder="Cliente"
        options={clients.map((clients) => ({
          label: clients.name,
          value: clients.id,
        }))}
      />

      {isLoading && <Loader $isLoading size={50} />}
      <Content>
        {!!clients && (
          <NotFoundContainer>
            <img src={notFoundImage} alt="Clientes não encontrados" />
            <p>Não encontramos nenhum cliente!</p>
          </NotFoundContainer>
        )}
        <CardList
          cards={clients.map((client) => ({
            id: client.id,
            name: client.name,
            address: client.address,
            phone: formatPhone(client.phone ?? ''),
            balance: client.balance as number,
            ordersCount: 12,
          }))}
        />
      </Content>
    </Container>
  );
}
