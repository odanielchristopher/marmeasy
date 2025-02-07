import { ComponentProps } from 'react';
import { Root, RootProps } from './styles';

interface ItemRootProps extends RootProps, ComponentProps<'div'> {
  children: React.ReactNode;
}

export function ItemRoot({ children, ...props }: ItemRootProps) {
  return <Root {...props}>{children}</Root>;
}
