import { ComponentProps } from 'react';
import styled, { css } from 'styled-components';

export interface StyledButtonProps extends ComponentProps<'button'> {
  $danger?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background: ${({ theme }) => theme.colors.orange.main};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0rem 0.4rem 1rem 0rem #0000000a;
  color: #fff;
  display: flex;
  font-size: 1.6rem;
  font-weight: 600;
  justify-content: center;
  height: 4.2rem;
  padding: 0 1.4rem;
  transition: background 0.2s ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.orange.light};
  }

  &:focus {
    outline: 0.1rem solid ${({ theme }) => theme.colors.green.main};
  }

  &:active {
    outline: none;
    background: ${({ theme }) => theme.colors.orange.dark};
  }

  &[disabled] {
    background: ${({ theme }) => theme.colors.gray.lighter} !important;
    cursor: default !important;
  }

  ${({ theme, $danger }) =>
    $danger &&
    css`
      background: ${theme.colors.red.main};

      &:hover {
        background: ${theme.colors.red.light};
      }

      &:active {
        background: ${theme.colors.red.dark};
      }
    `};
`;
