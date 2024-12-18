import { useCallback, useState } from 'react';

export const useFab = () => {
  const [isOpenModalClient, setOpenModalClient] = useState(false);
  const [isOpenModalCompany, setOpenModalCompany] = useState(false);

  const handleOpenClientModal = useCallback(() => {
    setOpenModalClient(true);
  }, []);

  const handleOpenCompanyModal = useCallback(() => {
    setOpenModalCompany(true);
  }, []);

  const handleCloseClientModal = useCallback(() => {
    setOpenModalClient(false);
  }, []);

  const handleCloseCompanyModal = useCallback(() => {
    setOpenModalCompany(false);
  }, []);

  const handleClientSubmit = useCallback(() => {
    setOpenModalClient(false);
  }, []);

  return {
    isOpenModalClient,
    isOpenModalCompany,
    handleOpenClientModal,
    handleOpenCompanyModal,
    handleCloseClientModal,
    handleCloseCompanyModal,
    handleClientSubmit,
  };
};
