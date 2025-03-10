import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4rem;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 4rem;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  font-size: 1.6rem;

  strong {
    max-width: 20rem;
    text-align: center;
    font-weight: 700;
  }

  p {
    text-align: center;
  }
`;

export const CancelButton = styled.button`
  align-items: center;
  background: transparent;
  border: 0.1rem solid ${({ theme }) => theme.colors.black.main};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0rem 0.4rem 1rem 0rem #0000000a;
  color: ${({ theme }) => theme.colors.black.main};
  display: flex;
  font-size: 1.6rem;
  font-weight: 400;
  justify-content: center;
  height: 4.2rem;
  padding: 0 1.4rem;
  transition: background 0.2s ease-in;

  &:hover {
    border: 0.1rem solid ${({ theme }) => theme.colors.gray.main};
    color: ${({ theme }) => theme.colors.gray.main};
  }

  &:focus {
    outline: 0.1rem solid ${({ theme }) => theme.colors.green.main};
  }

  &:active {
    outline: none;
    border: 0.1rem solid ${({ theme }) => theme.colors.gray.light};
    color: ${({ theme }) => theme.colors.gray.light};
  }

  &[disabled] {
    background: ${({ theme }) => theme.colors.gray.lighter} !important;
    cursor: default !important;
  }
`;

export const Actions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.2rem;

  button {
    width: 100%;
    height: 4.8rem;
  }
`;
