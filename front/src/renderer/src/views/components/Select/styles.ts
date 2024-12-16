import * as RdxSelect from '@radix-ui/react-select';
import styled, { css } from 'styled-components';

interface HasError {
  $error?: string;
}

interface LabelProps extends HasError {
  $isSeleted?: boolean;
}

export const Container = styled.div`
  max-width: 35rem;
  position: relative;
  color: ${({ theme }) => theme.colors.red.dark};

  .error {
    align-items: center;
    color: ${({ theme }) => theme.colors.red.dark};
    display: flex;
    gap: 0.6rem;
    margin-top: 0.2rem;

    span {
      font-size: 1.2rem;
    }
  }
`;

export const SelectContainer = styled.div`
  max-width: 35rem;
  position: relative;
`;

export const StyledLabel = styled.label<LabelProps>`
  color: ${({ theme }) => theme.colors.gray.light};
  left: 1.3rem;
  position: absolute;
  pointer-events: none;
  transition: all ease-in 100ms;
  z-index: 5;

  font-size: 1.6rem;
  top: 1.4rem;

  ${({ $isSeleted }) =>
    $isSeleted &&
    css`
      font-size: 1rem;
      top: 0.4rem;
    `}

  ${({ theme, $error }) =>
    $error &&
    css`
      color: ${theme.colors.red.dark};
      border-color: ${theme.colors.red.dark} !important;

      &:valid ~ label {
        color: ${({ theme }) => theme.colors.red.dark} !important;
      }
    `}
`;

export const StyledRdxSelectTrigger = styled(RdxSelect.Trigger)<HasError>`
  background-color: #fff;
  border-radius: 1rem;
  border: 0.1rem solid transparent;
  box-shadow: 0px 6px 4px 0px rgba(0, 0, 0, 0.08);
  padding-inline: 1.2rem;
  padding-top: 0.4rem;
  width: 100%;
  height: 4.8rem;
  outline: none;
  text-align: left;
  color: ${({ theme }) => theme.colors.black.main};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  font-size: 1.6rem;

  ${({ theme, $error }) =>
    $error &&
    css`
      color: ${theme.colors.red.dark};
      border-color: ${theme.colors.red.dark} !important;
    `}
`;

export const StyledRdxSelectIcon = styled(RdxSelect.Icon)`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
`;

export const StyledRdxSelectContent = styled(RdxSelect.Content)`
  background: #fff;
  border-radius: 0 0 0.8rem 0.8rem;
  box-shadow: 0rem 1.1rem 2rem 0rem rgba(0, 0, 0, 0.1);
  z-index: 4;
  width: var(--radix-select-trigger-width);
  max-height: 30rem;
`;

export const StyledRdxSelectUpButton = styled(RdxSelect.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.4rem;
  background-color: #fff;
  color: ${({ theme }) => theme.colors.gray.lighter};
`;

export const StyledRdxSelectDownButton = styled(RdxSelect.ScrollDownButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.4rem;
  background-color: #fff;
  color: ${({ theme }) => theme.colors.gray.lighter};
`;

export const StyledRdxSelectViewport = styled(RdxSelect.Viewport)`
  padding: 1rem;
`;

export const StyledRdxSelectItem = styled(RdxSelect.Item)`
  padding: 0.8rem;
  outline: none;

  &[data-state='checked'] {
    font-weight: 600;
  }

  &[data-highlighted] {
    background: #f8f9fa;
    transition: all ease 0.3s;
  }
`;
