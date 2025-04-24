import { NewCustomerModal } from './modals/NewCustomerModal';
import { NewOrderModal } from './modals/NewOrderModal';
import { NewPaymentModal } from './modals/NewPaymentModal';
import { useGlobalModalsController } from './useGlobalModalsController';

export function GlobalModals() {
  const {
    isOpenNewCustomerModal,
    isOpenNewOrderModal,
    isOpenNewPaymentModal,
    handleCloseNewCustomerModal,
    handleCloseNewOrderModal,
    handleCloseNewPaymentModal,
  } = useGlobalModalsController();

  return (
    <>
      {isOpenNewCustomerModal && (
        <NewCustomerModal open onClose={handleCloseNewCustomerModal} />
      )}
      {isOpenNewOrderModal && (
        <NewOrderModal open onClose={handleCloseNewOrderModal} />
      )}
      {isOpenNewPaymentModal && (
        <NewPaymentModal open onClose={handleCloseNewPaymentModal} />
      )}
    </>
  );
}
