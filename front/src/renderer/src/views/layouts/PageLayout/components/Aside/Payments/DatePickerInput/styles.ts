import styled, { css } from 'styled-components';

interface StyledButtonProps {
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
    gap: 0.6rem;
    margin-top: 0.2rem;

    span {
      font-size: 1.2rem;
    }
  }
`;

export const StyledButton = styled.button<StyledButtonProps>`
  margin-top: 1.2rem;
  background: #fff;
  width: 100%;
  border-radius: 1rem;
  border: 1px solid #ccc;
  height: 5.2rem;
  color: ${({ theme }) => theme.colors.black.main};
  text-align: left;
  padding-left: 1.2rem;
  padding-top: 2.0rem;
  position: relative;

  span {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.gray.light};
    left: 1.3rem;
    position: absolute;
    pointer-events: none;
    top: 0.4rem;
  }

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
