import styled from 'styled-components';

export const Container = styled.div``;

export const Form = styled.form`
  p {
    color: ${({ theme }) => theme.colors.gray.main};
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
  }
`;

export const CancelButton = styled.button`
  align-items: center;
  background: transparent;
  border: .1rem solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.black.main};
  display: flex;
  font-size: 1.6rem;
  font-weight: 400;
  justify-content: center;
  height: 4.2rem;
  padding: 0 1.4rem;
  transition: background .2s ease-in;

  &:hover {
    color: ${({ theme }) => theme.colors.gray.main};
  }

  &:focus {
    outline: .1rem solid ${({ theme }) => theme.colors.green.main};
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

interface FooterProps {
  justify?: 'end' | 'center'
}

export const Footer = styled.div<FooterProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify === 'end' ? 'flex-end' : 'space-between'};
  gap: 1.2rem;

  margin-top: 4.8rem;

  button {
    height: 4.8rem;
    width: 18.0rem;
  }
`;
