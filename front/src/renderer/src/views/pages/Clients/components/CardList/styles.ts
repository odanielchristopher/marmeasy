import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FFF;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
  border-radius: 1.6rem;
  margin-top: 1.6rem;
  padding: 1.6rem;
  width: 100%;
  max-width: 30.0rem;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
  &:hover {
    transform: translateY(-0.4rem);
  }
`;

export const Header= styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 2.5rem;

  h2 {
    color: ${({ theme }) => theme.colors.black.light};
    font-size: 2.0rem;
    font-weight: 700;
  }

  h3 {
    font-weight: 700;
    font-size: 1.6rem;
  }

  p {
    color: ${({ theme }) => theme.colors.gray.light};
    font-size: 1.6rem;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  h3 {
    color: ${({ theme }) => theme.colors.black.light};
    font-size: 1.8rem;
    font-weight: 600;
  }

  p {
    color: ${({ theme }) => theme.colors.gray.light};
    font-size: 1.6rem;
  }

  .ultimatefooter{
  display: flex;
  justify-content: space-between;
  }
`;

export const Separator = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  width: 100%;

  &.header {
    margin-top: 1.6rem;
    margin-bottom: 1.0rem;
  }

  &.footer {
  margin-bottom: 1.0rem;
  }
`;

export const details = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 2.5rem;
  background-color: red;
`;
