import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4.8rem;
`;

export const Form = styled.form`
  p {
    color: ${({ theme }) => theme.colors.gray.main};
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
  }

  button {
    margin-top: 4.8rem;
    width: 100%;
    height: 4.8rem;
  }
`;

export const CancelButton = styled.button`
  align-items: center;
  background: transparent;
  border: 0.1rem solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.black.main};
  display: flex;
  font-size: 1.6rem;
  font-weight: 400;
  justify-content: center;
  height: 4.2rem;
  padding: 0 1.4rem;
  transition: background 0.2s ease-in;

  &:hover {
    color: ${({ theme }) => theme.colors.gray.main};
  }

  &:focus {
    outline: 0.1rem solid ${({ theme }) => theme.colors.green.main};
  }

  &:active {
    outline: none;
    color: ${({ theme }) => theme.colors.gray.light};
  }

  &[disabled] {
    background: ${({ theme }) => theme.colors.gray.lighter} !important;
    cursor: default !important;
  }
`;
