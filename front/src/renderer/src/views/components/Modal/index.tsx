import * as Dialog from '@radix-ui/react-dialog';


import { CloseIcon } from '@renderer/views/Icons/CloseIcon';
import { CloseButton, Header, StyledRdxDialogContent, StyledRdxDialogOverlay, Title } from './styles';
interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose(): void;
  title: string;
}

export default function Modal({ title, open, children, onClose }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
		<Dialog.Portal>
			<StyledRdxDialogOverlay/>
			<StyledRdxDialogContent aria-describedby=''>
        <Dialog.Title about={title}>
          <Header>
            <Title>{title}</Title>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </Header>
        </Dialog.Title>
				{children}
			</StyledRdxDialogContent>
		</Dialog.Portal>
	</Dialog.Root>
  );
}
