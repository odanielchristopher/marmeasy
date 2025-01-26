//@ts-ignore
import Modal from '@renderer/views/components/Modal';
import ClientForm from '@renderer/views/pages/Clients/components/ClientForm';
import useClientModal from './useClientModal';

interface ClientModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function ClientModal({ isOpen, onClose }: ClientModalProps) {
  const { handleSubmit, isLoading } = useClientModal(onClose);

  return (
    <Modal open={isOpen} title="Novo cliente" onClose={onClose}>
      <ClientForm
        clientType="FISICO"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        buttonLabel="Adicionar cliente"
      />
    </Modal>
  );
}
