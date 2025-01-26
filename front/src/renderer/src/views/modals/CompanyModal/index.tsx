//@ts-ignore
import Modal from '@renderer/views/components/Modal';
import ClientForm from '@renderer/views/pages/Clients/components/ClientForm';
import useCompanyModal from './useCompanyModal';

interface ClientModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function ClientModal({ isOpen, onClose }: ClientModalProps) {
  const { handleSubmit, isLoading } = useCompanyModal(onClose);

  return (
    <Modal open={isOpen} title="Nova empresa" onClose={onClose}>
      <ClientForm
        clientType="JURIDICO"
        buttonLabel="Adicionar empresa"
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
