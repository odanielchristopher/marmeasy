import { useIsMobile } from '@app/hooks/useIsMobile';

import { DesktopContainer } from './containers/DesktopContainer';
import { MobileContainer } from './containers/MobileContainer';
import { EditItemForm, IEditItemFormProps } from './EditItemForm';

interface IEditItemDialogProps extends IEditItemFormProps {
  open: boolean;
  onClose?(): void;
}

export function EditItemDialog({
  open,
  onClose,
  ...formProps
}: IEditItemDialogProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileContainer open={open} onOpenChange={onClose}>
        <EditItemForm {...formProps} />
      </MobileContainer>
    );
  }

  return (
    <DesktopContainer
      open
      onClose={onClose}
      imagePath={formProps.item.imagePath}
    >
      <EditItemForm {...formProps} />
    </DesktopContainer>
  );
}
