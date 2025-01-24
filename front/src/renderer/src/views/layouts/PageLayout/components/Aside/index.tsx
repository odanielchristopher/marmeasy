import { useEffect, useState } from 'react';
import {
  Actions,
  ActionsButton,
  Container,
  Empty,
  Header,
  Main,
} from './styles';

import { useLocation } from 'react-router-dom';

import useAside from '@renderer/app/hooks/useAside';
import clipboard from '@renderer/assets/Images/Clipboard.svg';
import AddOrder from './AddOrder';
import UpdateClientForm from './UpdateClientForm';

import fraseSvg from '@renderer/assets/Images/nome-marmeasy.svg';
import DetailsOrder from './DetailsOrder';

interface AsideProps {
  area: string;
}

export default function Aside({ area }: AsideProps) {
  const [showDetails, setShowDetails] = useState(true);
  const [showAddOrders, setShowAddOrders] = useState(false);

  const { showClientData, seletedClient, handleHiddenClientData } = useAside();

  function handleShowDetails() {
    setShowDetails(true);
    setShowAddOrders(false);
  }

  function handleShowAddOrders() {
    setShowAddOrders(true);
    setShowDetails(false);
  }

  useEffect(() => {
    return () => {
      handleHiddenClientData();
    };
  }, []);

  const location = useLocation();

  const hasOrders = ['/orders'].includes(location.pathname);

  return (
    <Container $area={area}>
      <Header>
        <img src={fraseSvg} alt="Marmeasy" />
      </Header>

      <Actions>
        <ActionsButton $isActive={showDetails} onClick={handleShowDetails}>
          Mostrar detalhes
        </ActionsButton>
        {hasOrders && (
          <ActionsButton
            $isActive={showAddOrders}
            onClick={handleShowAddOrders}
          >
            Adicionar pedido
          </ActionsButton>
        )}
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

      {/* {showClientData && !hasOrders && <UpdateClientForm client={seletedClient} $isShow={showClientData} />} */}
<<<<<<< HEAD
      {showClientData && showDetails && [
        hasOrders ? <DetailsOrder key="detailsOrder" client={seletedClient} /> : <UpdateClientForm key="updateClientForm" client={seletedClient} $isShow={showClientData}/>,
      ]}

      {(showAddOrders && hasOrders) && <AddOrder client={seletedClient} />}
=======
      {showClientData &&
        showDetails && [
          hasOrders ? (
            <DetailsOrder key="detailsOrder" client={seletedClient} />
          ) : (
            <UpdateClientForm
              key="updateClientForm"
              client={seletedClient}
              $isShow={showClientData}
            />
          ),
        ]}
>>>>>>> 939ef66b1860980199fe689456a4f4f69a3b87a7

      {showAddOrders && hasOrders && <AddOrder client={seletedClient} />}
    </Container>
  );
}
