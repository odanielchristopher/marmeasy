import { useOpenModal } from '@renderer/app/hooks/useOpeModal';
import Modal from '@renderer/views/components/Modal';

// interface ProfileProps {
//   isOpen?: boolean
//   onClose?(): void;
// }

export default function Profile() {
  const { isProfileModalOpen, handleIsProfileModalOpen } = useOpenModal();

  return (
    <Modal open={isProfileModalOpen} onClose={handleIsProfileModalOpen}>
      <button onClick={handleIsProfileModalOpen}>teste de modal</button>
    </Modal>
  );
}
