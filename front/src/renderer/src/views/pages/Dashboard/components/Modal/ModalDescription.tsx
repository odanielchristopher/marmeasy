import { Description } from './styles';

interface ModalDescriptionProps {
  text: string;
}

export function ModalDescription({ text }: ModalDescriptionProps) {
  return <Description>{text}</Description>;
}
