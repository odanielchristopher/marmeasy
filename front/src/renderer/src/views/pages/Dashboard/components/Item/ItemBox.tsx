import React from 'react';
import { Box, BoxProps } from './styles';

interface ItemBoxProps extends BoxProps {
  children: React.ReactNode;
}

export function ItemBox({ children, ...props }: ItemBoxProps) {
  return (
    <Box {...props}>
      {children}
    </Box>
  );
}
