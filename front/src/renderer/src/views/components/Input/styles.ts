import styled, { css } from 'styled-components';
import { InputProps } from '.';

interface LabelProps {
  $error?: string;
}

export const Container = styled.div`
  position: relative;

  & + & {
    margin-top: 1.2rem;
  }

  .error {
    align-items: center;
    color: ${({ theme }) => theme.colors.red.dark};
    display: flex;
    gap: .6rem;
    margin-top: .2rem;

    span {
      font-size: 1.2rem;
    }
  }
`;

export const StyledInput = styled.input<InputProps>`
  appearance: none;
  background: #FFF;
  border: .1rem solid ${({ theme }) => theme.colors.gray.lighter};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0rem .4rem 1.0rem 0rem #0000000A;
  font-size: 1.4rem;
  height: 4.8rem;
  outline: none;
  padding: 1.0rem;
  width: 100%;
  transition: border-color .2s ease-in;

  &:focus {
    border-color: ${({ theme }) => theme.colors.green.main};
  }

  &[disabled] {
    background-color: #f2f2f2;
    border-color: transparent;
  }

  &:not(:placeholder-shown) {
    padding-top: 2.0rem;
  }

  &:placeholder-shown ~ label {
    font-size: 1.4rem;
    top: 1.4rem;
  }

  ${({ theme, $error }) => $error && css`
    color: ${theme.colors.red.dark};
    border-color: ${theme.colors.red.dark} !important;

    &:valid ~ label {
      color: ${({ theme }) => theme.colors.red.dark} !important;
    }
  `}
`;

export const StyledLabel = styled.label<LabelProps>`
  color: ${({ theme }) => theme.colors.gray.light};
  font-size: 1.0rem;
  left: 1.3rem;
  position: absolute;
  pointer-events: none;
  top: .4rem;
  transition: all ease-in 100ms;

  ${({ theme, $error }) => $error && css`
    color: ${theme.colors.red.dark};
    border-color: ${theme.colors.red.dark} !important;

    &:valid ~ label {
      color: ${({ theme }) => theme.colors.red.dark} !important;
    }
  `}
`;
