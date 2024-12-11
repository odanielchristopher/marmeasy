import Modal from '@renderer/views/components/Modal';

interface ProfileProps {
  isOpen: boolean
  onClose(): void
}

export default function Profile({ isOpen, onClose }: ProfileProps) {
  return (
    <Modal visible={isOpen}>
      <button onClick={onClose}>teste de modal</button>
    </Modal>
  );
}
