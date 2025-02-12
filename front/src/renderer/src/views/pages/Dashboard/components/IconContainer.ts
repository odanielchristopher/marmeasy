import styled, { css } from 'styled-components';

export interface IconProps {
  color?: 'default' | 'success' | 'danger';
  height?: number;
}

const IconVariants = {
  default: css`
    color: ${({ theme }) => theme.colors.black.main};
  `,
  success: css`
    color: ${({ theme }) => theme.colors.green.main};
  `,
  danger: css`
    color: ${({ theme }) => theme.colors.red.main};
  `,
};

export const IconContainer = styled.div<IconProps>`
  ${({ height }) =>
    height &&
    css`
      height: ${height / 10}rem;
    `};
  ${({ color }) => IconVariants[color || 'default']};
`;
