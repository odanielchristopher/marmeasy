import { useEffect, useState } from 'react';
import { Actions, Container, Empty, Header, Main } from './styles';

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
  const [showOrders, setShowOrders] = useState(false);
  const [showPayments, setShowPayments] = useState(false);

  useEffect(() => {
    function handleAsideData(pathname: string) {
      if (pathname == '/orders') {
        setShowOrders(true);
        setShowPayments(false);
        return;
      }

      setShowOrders(false);
      setShowPayments(true);
    }

    handleAsideData(pathname);

    return () => {
      handleHiddenClientData();
    };
  }, [pathname]);

  return (
    <Container $area={area}>
      <Header>
        <img src={fraseSvg} alt="Marmeasy" />
      </Header>

      <Actions></Actions>

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

      {showClientData && showOrders && <DetailsOrder client={seletedClient} />}

      {showClientData && showPayments && <Payments client={seletedClient} />}
    </Container>
  );
}
