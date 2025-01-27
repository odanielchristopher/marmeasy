import { useEffect } from 'react';
import {
  Actions,
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
import Payments from './Payments';

interface AsideProps {
  area: string;
}

export default function Aside({ area }: AsideProps) {
  const { showClientData, seletedClient, handleHiddenClientData } = useAside();
  const { pathname } = useLocation();

  useEffect(() => {
    return () => {
      handleHiddenClientData();
    };
  }, [pathname]);


  const showOrders = ['/orders'].includes(pathname);
  const showPayments = ['/'].includes(pathname);

  return (
    <Container $area={area}>
      <Header>
        <img src={fraseSvg} alt="Marmeasy" />
      </Header>

      <Actions>
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

      {showClientData && [
        showOrders && <DetailsOrder key="detailsOrder" client={seletedClient} />,
      ]}

      {showClientData && showPayments && <Payments client={seletedClient} />}
    </Container>
  );
}
