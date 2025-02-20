import React from 'react';

import Modal, { ModalProps } from '@renderer/views/components/Modal';

interface ModalRootProps extends ModalProps {
  children: React.ReactNode;
}

export function ModalRoot({ children, ...props }: ModalRootProps) {
  return (
    <Modal {...props} $maxHeight={580}>
      {children}
    </Modal>
  );
}
