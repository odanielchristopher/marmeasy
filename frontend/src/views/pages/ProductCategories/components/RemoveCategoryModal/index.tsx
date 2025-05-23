import { IProductCategory } from '@app/entities/ProductCategories';
import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import { Button } from '@views/components/ui/Button';
import { Modal } from '@views/components/ui/Modal';

interface IRemoveCategoryModalProps {
  open: boolean;
  category: IProductCategory | null;
  onClose(): void;
}

export function RemoveCategoryModal({
  open,
  category,
  onClose,
}: IRemoveCategoryModalProps) {
  if (!category) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose} title="Editar categoria">
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-8">
          <strong>Tem certeza que deseja excluir esta categoria?</strong>

          <div className="px-2 py-3 border bg-card rounded-full w-fit">
            <span>{category.icon}</span>
            <span>{capitalizeFirstLetter(category.name)}</span>
          </div>
        </div>

        <footer className="flex gap-4 w-full">
          <Button
            type="button"
            variant="outline"
            className="border-gray-800 dark:border-white flex-1"
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button
            type="button"
            variant="destructive"
            className="flex-1"
            onClick={() => console.log('Excluiu')}
          >
            Sim, desejo excluir
          </Button>
        </footer>
      </div>
    </Modal>
  );
}
