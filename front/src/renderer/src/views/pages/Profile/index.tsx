import Modal from '@renderer/components/Modal';
import { profileEventManager } from '@renderer/utils/openProfileModal';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function openModal() {
      setIsOpen(true);
    }

    profileEventManager.on('openprofilemodal', openModal);

    return () => {
      profileEventManager.on('openprofilemodal', openModal);
    };
  }, [isOpen]);



  return (
    <Modal visible={isOpen}>
      <button onClick={() => setIsOpen(false)}>teste de modal</button>
    </Modal>
  );
}
