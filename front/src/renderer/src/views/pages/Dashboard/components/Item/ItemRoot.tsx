import { ComponentProps } from 'react';
import { Root, RootProps } from './styles';

interface ItemRootProps extends RootProps, ComponentProps<'div'> {
  children: React.ReactNode;
}

export function ItemRoot({ children, hasAction }: ItemRootProps) {
  return (
    <Root hasAction={hasAction}>
      {children}
    </Root>
  );
}
