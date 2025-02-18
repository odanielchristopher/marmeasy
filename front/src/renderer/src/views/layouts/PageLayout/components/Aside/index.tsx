import { useEffect, useState } from 'react';
import { Actions, Container, Empty, Header, Main } from './styles';

import { useLocation } from 'react-router-dom';

import useAside from '@renderer/app/hooks/useAside';

import fraseSvg from '@renderer/assets/Images/nome-marmeasy.svg';
import DetailsOrder from './DetailsOrder';
import Payments from './Payments';

import clipboard from '@renderer/assets/Images/Clipboard.svg';

interface AsideProps {
  area: string;
}

export default function Aside({ area }: AsideProps) {
  const { showClientData, showOrderData, seletedClient, selectedOrder, handleHiddenClientData, handleHiddenOrderData } = useAside();
  const { pathname } = useLocation();
  const [showOrders, setShowOrders] = useState(false);
  const [showPayments, setShowPayments] = useState(true);

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
      handleHiddenOrderData();
    };
  }, [pathname]);

  return (
    <Container $area={area}>
      <Header>
        <img src={fraseSvg} alt="Marmeasy" />
      </Header>

      <Actions></Actions>

      {!showClientData && !showOrderData && (
        <Main>
          <Empty>
            <img src={clipboard} alt="Empty" />

            <p>
              <b>Nenhum cliente ou pedido selecionado!</b>
              Clique em algum cliente ou pedido para ver seus detalhes.
            </p>
          </Empty>
        </Main>
      )}

      {showOrderData && showOrders && <DetailsOrder order={selectedOrder} />}
      {showClientData && showPayments && <Payments client={seletedClient} />}
    </Container>
  );
}
