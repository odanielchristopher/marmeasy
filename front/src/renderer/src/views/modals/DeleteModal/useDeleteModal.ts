import { useState } from 'react';

interface UseDeleteModalProps {
  onClose(): void;
  onConfirm(): void;
}

export default function useDeleteModal({ onClose, onConfirm }: UseDeleteModalProps) {
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
