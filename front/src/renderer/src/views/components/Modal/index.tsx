import * as Dialog from '@radix-ui/react-dialog';


import { StyledRdxDialogContent, StyledRdxDialogOverlay } from './styles';
interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose?(): void;
}

export default function Modal({ open, children, onClose }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
		<Dialog.Portal>
			<StyledRdxDialogOverlay/>
			<StyledRdxDialogContent aria-describedby=''>
        <Dialog.Title about='Modal'/>
				{children}
			</StyledRdxDialogContent>
		</Dialog.Portal>
	</Dialog.Root>
  );
}
