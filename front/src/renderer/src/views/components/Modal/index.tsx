import * as Dialog from '@radix-ui/react-dialog';

// import { CloseIcon } from '@renderer/assets/Icons/CloseIcon';
import { ActionContainer, CloseButton, Header, StyledRdxDialogContent, StyledRdxDialogOverlay, Title, Footer } from './styles';
interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose?(): void;
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
            <Title>{title}</Title>
          </Header>
        </Dialog.Title>

				{children}
        <Footer>
          <CloseButton onClick={onClose}>
            {/* <CloseIcon /> */}
            <span>Cancelar</span>
          </CloseButton>
        
          <ActionContainer>
            {action}
          </ActionContainer>
        </Footer>
			</StyledRdxDialogContent>
		</Dialog.Portal>
	</Dialog.Root>
  );
}
