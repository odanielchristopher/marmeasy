import { Help } from './styles';

interface ItemHelpProps {
  text: string;
}

export function ItemHelp({ text }: ItemHelpProps) {
  return (
    <Help>{text}</Help>
  );
}
