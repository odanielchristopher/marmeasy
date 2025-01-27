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

import fraseSvg from '@renderer/assets/Images/nome-marmeasy.svg';
import DetailsOrder from './DetailsOrder';

interface AsideProps {
  area: string;
}

export default function Aside({ area }: AsideProps) {
  const [showDetails, setShowDetails] = useState(true);

  const { showClientData, seletedClient, handleHiddenClientData } = useAside();

  function handleShowDetails() {
    setShowDetails(true);
  }

  useEffect(() => {
    return () => {
      handleHiddenClientData();
    };
  }, []);

  const location = useLocation();

  const showOrders = ['/orders'].includes(location.pathname);

  return (
    <Container $area={area}>
      <Header>
        <img src={fraseSvg} alt="Marmeasy" />
      </Header>

      <Actions>
        <ActionsButton $isActive={showDetails} onClick={handleShowDetails}>
          Mostrar detalhes
        </ActionsButton>
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
      {showClientData &&
        showDetails && [
          showOrders && (
            <DetailsOrder key="detailsOrder" client={seletedClient} />
          ),
        ]}
    </Container>
  );
}
