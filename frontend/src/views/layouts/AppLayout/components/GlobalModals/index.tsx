import { NewCustomerModal } from '@views/modals/NewCustomerModal';
import { NewPaymentModal } from '@views/modals/NewPaymentModal';

import { useGlobalModalsController } from './useGlobalModalsController';

export function GlobalModals() {
  const {
    isOpenNewCustomerModal,
    isOpenNewPaymentModal,
    handleCloseNewCustomerModal,
    handleCloseNewPaymentModal,
  } = useGlobalModalsController();

  return (
    <>
      {isOpenNewCustomerModal && (
        <NewCustomerModal open onClose={handleCloseNewCustomerModal} />
      )}
      {isOpenNewPaymentModal && (
        <NewPaymentModal open onClose={handleCloseNewPaymentModal} />
      )}
    </>
  );
}
