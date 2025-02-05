import { Currency, CurrencyProps } from './styles';

interface ItemCurrencyProps extends CurrencyProps {
  text: string;
}

export function ItemCurrency({ text, ...props }: ItemCurrencyProps) {
  return (
    <Currency {...props}>{text}</Currency>
  );
}
