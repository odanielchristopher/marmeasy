//@ts-ignore
import { Client } from '@renderer/app/entities/Client';
import DeleteModal from '../DeleteModal';
import useDeleteClientModal from './useDeleteClientModal';

interface EditClientModalProps {
  isOpen: boolean;
  onClose(): void;
  onDelete(): void;
  client: Client | null;
}

export default function DeleteClientModal({
  isOpen,
  client,
  onClose,
  onDelete,
}: EditClientModalProps) {
  const { handleDeleteClient } = useDeleteClientModal({
    onSuccess: onDelete,
    client,
  });

  return (
    <DeleteModal
      onConfirm={handleDeleteClient}
      open={isOpen}
      onClose={onClose}
      answer={
        client?.type === 'FISICO'
          ? 'Tem certeza que deseja excluir esse cliente?'
          : 'Tem certeza que deseja excluir essa empresa?'
      }
      description={
        client?.type === 'FISICO'
          ? 'Todos os dados relacionados a esse cliente serão apagados e não poderão ser recuperados.'
          : 'Todos os dados relacionados a essa empresa serão apagados e não poderão ser recuperados.'
      }
    />
  );
}
