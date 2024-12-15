import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1.6rem;
  width: 100%;

  display: flex;
  justify-content: space-between;
`;

export const Main = styled.div`
  position: relative;
`;

export const Header = styled.header`
  div {
    align-items: center;
    display: flex;

    h1 {
      color: ${({ theme }) => theme.colors.black.light};
      font-size: 2.8rem;
      font-weight: 600;
      margin-left: 1.0rem;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.gray.light};
    margin-top: .4rem;
  }
`;

export const Content = styled.div`
  overflow-y: auto;
  padding: 1.2rem;
  height: 100%;
  display: grid;
  gap: 1.6rem;  
  grid-template-columns: repeat(3, minmax(30rem, 1fr));
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
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

export const DivHeader= styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 2.5rem;

  h2 {
    color: ${({ theme }) => theme.colors.black.light};
    font-size: 2.0rem;
    font-weight: 600;
  }

  p {
    color: ${({ theme }) => theme.colors.gray.light};
    font-size: 1.6rem;
  }
`;

export const DivFooter= styled.footer`
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




