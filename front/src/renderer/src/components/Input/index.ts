import styled, { css } from 'styled-components';
import { IInput } from './interface';

export default styled.input<IInput>`
  appearance: none;
  background: #FFF;
  border: .2rem solid ${({ theme }) => theme.colors.gray.light};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0rem .4rem 1.0rem 0rem #0000000A;
  font-size: 1.4rem;
  outline: none;
  padding: .4rem 1.2rem;
  height: 4.2rem;
  width: 100%;
  transition: border-color .2s ease-in;

  & + & {
    margin-top: 1.2rem;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.orange.main};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.red.main};
    border-color: ${theme.colors.red.main} !important;
  `}

`;
