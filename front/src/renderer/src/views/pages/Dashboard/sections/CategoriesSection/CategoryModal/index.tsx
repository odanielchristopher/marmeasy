import { categories } from '@renderer/app/mocks/categories';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import { DashboardCategoryIcon } from '@renderer/assets/Icons/dashboard/DashboardCategoryIcon';
import { Item } from '../../../components/Item';
import { Modal } from '../../../components/Modal';
import { ListPerDate } from './styles';

interface CategoryModalProps {
  open: boolean;
  onClose(): void;
  title: string;
  type: 'expense' | 'income';
  icon: string;
}

export default function CategoryModal({
  onClose,
  open,
  title,
  icon,
  type,
}: CategoryModalProps) {
  const datas = type === 'expense' ? categories.expenses : categories.incomes;

  return (
    <Modal.Root open={open} onClose={onClose} title={title}>
      <ListPerDate>
        <Modal.Label text="Janeiro, 2025" />
        <Modal.Description text="Sexta, 31 jan. 2025" />

        {datas.map((category) => (
          <Item.Root key={category!.id}>
            <Item.Box $align="center">
              <Item.Icon height={32}>
                <DashboardCategoryIcon type={type} icon={icon} size={32} />
              </Item.Icon>

              <Item.Box $direction="column" $gap={-7}>
                <Item.Title text={title} />
                <Item.Currency
                  text={`R$ ${formatCurrency(category?.value ?? 0)}`}
                  color={type === 'expense' ? 'danger' : 'success'}
                />
              </Item.Box>
            </Item.Box>
          </Item.Root>
        ))}
      </ListPerDate>
    </Modal.Root>
  );
}
