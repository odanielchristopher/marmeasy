import { Modal } from '@views/components/ui/Modal';

interface IFiltersModalProps {
  open: boolean;
  onClose(): void;
}

export function FiltersModal({ open, onClose }: IFiltersModalProps) {
  return (
    <Modal open={open} title="Filtros" onClose={onClose}>
      Filtros da tela de clientes
    </Modal>
  );
}
