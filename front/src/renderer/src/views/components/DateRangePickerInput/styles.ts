import styled, { css } from 'styled-components';

interface StyledButtonProps {
  $error?: string;
}

export const Container = styled.div`
  position: relative;
  width: 30rem;

  & + & {
    margin-top: 1.2rem;
  }
`;

export const StyledButton = styled.button<StyledButtonProps>`
  background: #fff;
  width: 100%;
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.black.main};
  text-align: left;
  height: 5.2rem;
  padding-left: 1.2rem;
  border: 0.2rem solid transparent;
  font-size: 1.6rem;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.08);

  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.orange.light};
  }

  ${({ theme, $error }) =>
    $error &&
    css`
      color: ${theme.colors.red.dark};
      border-color: ${theme.colors.red.dark} !important;
    `}
`;

export const StyledDate = styled.div``;
