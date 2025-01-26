//@ts-ignore
import { Client } from '@renderer/app/entities/Client';
import { DeleteIcon } from '@renderer/assets/Icons/DeleteIcon';
import Modal from '@renderer/views/components/Modal';
import ClientForm from '@renderer/views/pages/Clients/components/ClientForm';
import { useState } from 'react';
import DeleteClientModal from '../DeleteClientModal';
import useEditClientModal from './useEditClientModal';

interface EditClientModalProps {
  isOpen: boolean;
  onClose(): void;
  client: Client | null;
}

export default function EditClientModal({
  isOpen,
  onClose,
  client,
}: EditClientModalProps) {
  const { handleSubmit, isLoading } = useEditClientModal({
    onSuccess: onClose,
    client,
  });

  const [isOpenDeleteClientModal, setIsOpenDeleteClientModal] = useState(false);

  function handleOpenDeleteClientModal() {
    setIsOpenDeleteClientModal(true);
  }

  function handleCloseDeleteClientModal() {
    setIsOpenDeleteClientModal(false);
  }

  if (isOpenDeleteClientModal) {
    return (
      <DeleteClientModal
        client={client}
        isOpen
        onClose={handleCloseDeleteClientModal}
        onDelete={() => {
          handleCloseDeleteClientModal();
          onClose();
        }}
      />
    );
  }

  return (
    <Modal
      open={isOpen}
      title="Novo cliente"
      onClose={onClose}
      action={
        <button type="button" onClick={handleOpenDeleteClientModal}>
          <DeleteIcon />
        </button>
      }
    >
      <ClientForm
        clientType={client?.type ?? 'FISICO'}
        client={client}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        buttonLabel="Salvar alterações"
      />
    </Modal>
  );
}
