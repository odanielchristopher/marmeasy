import * as Dialog from '@radix-ui/react-dialog';

import { CloseIcon } from '@renderer/assets/Icons/CloseIcon';
import { ActionContainer, CloseButton, Header, StyledRdxDialogContent, StyledRdxDialogOverlay, Title } from './styles';
interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose(): void;
  title: string;
  action?: React.ReactNode;
}

export default function Modal({ title, action, open, children, onClose }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
		<Dialog.Portal>
			<StyledRdxDialogOverlay/>
			<StyledRdxDialogContent aria-describedby=''>
        <Dialog.Title about={title}>
          <Header>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>

            <Title>{title}</Title>

            <ActionContainer>
              {action}
            </ActionContainer>
          </Header>
        </Dialog.Title>
				{children}
			</StyledRdxDialogContent>
		</Dialog.Portal>
	</Dialog.Root>
  );
}
