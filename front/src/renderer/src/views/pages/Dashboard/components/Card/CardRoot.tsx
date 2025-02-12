import { ComponentProps } from 'react';
import { Root, RootProps } from './styles';

interface CardRootProps extends RootProps, ComponentProps<'button'> {
  children: React.ReactNode;
}

export default function CardRoot({
  children,
  $justify,
  ...props
}: CardRootProps) {
  return (
    <Root $justify={$justify} {...props}>
      {children}
    </Root>
  );
}
