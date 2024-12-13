import { useState } from 'react';

export default function useDeleteModal({ onClose, onConfirm }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleConfirmButton() {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
    onClose();
  }

  return {
    isLoading,
    handleConfirmButton,
  };
}
