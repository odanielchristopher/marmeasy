import { Label, LabelProps } from './styles';

interface ModalLabelProps extends LabelProps {
  text: string;
}

export function ModalLabel({ text, ...props }: ModalLabelProps) {
  return <Label {...props}>{text}</Label>;
}
