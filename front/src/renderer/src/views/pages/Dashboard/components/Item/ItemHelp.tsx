import { Help, HelpProps } from './styles';

interface ItemHelpProps extends HelpProps {
  text: string;
}

export function ItemHelp({ text, ...props }: ItemHelpProps) {
  return (
    <Help {...props}>{text}</Help>
  );
}
