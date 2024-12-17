import { useState } from 'react';
import { Actions, ActionsButton, Container, Empty, Header, Main } from './styles';

import { useLocation } from 'react-router-dom';

import useAside from '@renderer/app/hooks/useAside';
import clipboard from '@renderer/assets/Images/Clipboard.svg';
import ClientForm from '../ClientForm';
import frase from '/frase.png?url';

interface AsideProps {
  area: string;
}

export default function Aside({ area }: AsideProps) {
  const [showDetails, setShowDetails] = useState(true);
  const [showAddOrders, setShowAddOrders] = useState(false);

  const { showClientData, seletedClient } = useAside();

  function handleShowDetails() {
    setShowDetails(true);
    setShowAddOrders(false);
  }

  function handleShowAddOrders() {
    setShowAddOrders(true);
    setShowDetails(false);
  }

  const location = useLocation();

  const hasOrders = ['/orders'].includes(location.pathname);

  return (
    <Container $area={area}>
      <Header>
        <img src={frase} alt='' />
      </Header>

      <Actions>
        <ActionsButton $isActive={showDetails} onClick={handleShowDetails}>Mostrar detalhes</ActionsButton>
        {hasOrders && <ActionsButton $isActive={showAddOrders} onClick={handleShowAddOrders}>Adicionar pedido</ActionsButton>}
      </Actions>

      {!showClientData && (
        <Main>
          <Empty>
            <img src={clipboard} alt="Empty" />

            <p>
              <b>Nenhum cliente selecionado!</b>
              Clique em algum cliente para ver seus detalhes.
            </p>
          </Empty>
        </Main>
      )}

      {showClientData && <ClientForm client={seletedClient} $isShow={showClientData}/>}

    </Container >
  );
}
