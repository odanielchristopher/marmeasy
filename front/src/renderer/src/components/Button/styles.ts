import styled, { css } from 'styled-components';
import { StyledButtonProps } from './interface';

export const StyledButton = styled.button<StyledButtonProps>`
align-items: center;
  background: ${({ theme }) => theme.colors.orange.main};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0rem .4rem 1.0rem 0rem #0000000A;
  color: #FFF;
  display: flex;
  font-size: 1.6rem;
  font-weight: 600;
  justify-content: center;
  height: 4.2rem;
  padding: 0 1.4rem;
  transition: background .2s ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.orange.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.orange.dark};
  }

  &[disabled] {
    background: ${({ theme }) => theme.colors.gray.main} !important;
    cursor: default !important;
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.red.main};

    &:hover {
      background: ${theme.colors.red.light};
    }

    &:active {
      background: ${theme.colors.red.dark};
    }
  `};
`;
