import { NumericFormat } from 'react-number-format';
import styled, { css } from 'styled-components';

interface InputProps {
  $error?: string;
}

export const Container = styled.div`
  position: relative;

  .error {
    align-items: center;
    color: ${({ theme }) => theme.colors.red.dark} !important;
    display: flex;
    gap: .6rem;
    margin-top: .2rem;

    span {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.red.dark} !important;
    }
  }
`;

export const StyledInput = styled(NumericFormat)<InputProps>`
  border: none;
  color: ${({ theme }) => theme.colors.black.main};
  font-size: 3.2rem;
  font-weight: 600;
  letter-spacing: -0.1rem;
  outline: none;
  width: 100%;
  background-color: transparent;

  ${({ theme, $error }) => $error && css`
    color: ${theme.colors.red.main};

    &::placeholder {
      color: ${theme.colors.red.main};
    }
  `}
`;
