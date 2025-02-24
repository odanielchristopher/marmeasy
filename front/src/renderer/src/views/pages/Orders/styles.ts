import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  grid-area: main;
  margin-top: 1.6rem;
  width: 100%;
  height: 100%;

  .align-container {
    display: flex;
    align-items: center;
    justify-content: space-between; /* Distribui o espaço entre os itens */
    gap: 1rem; /* Espaço entre o Select e a date-container */
    width: 100%; /* Certifica-se de usar a largura completa */
  }

  .date-container {
    display: flex;
    align-items: center;
    width: 30rem;
    gap: 0.8rem; /* Espaço entre o texto e o botão */
  }

  .filters {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    width: 100%;
    justify-content: space-between;

    @media (max-width: 1060px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export const Header = styled.header`
  margin-bottom: 3.6rem;
  div {
    align-items: center;
    display: flex;

    h1 {
      color: ${({ theme }) => theme.colors.black.light};
      font-size: 2.8rem;
      font-weight: 600;
      margin-left: 1rem;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.gray.light};
    margin-top: 0.4rem;
  }
`;

export const Content = styled.div`
  overflow-y: auto;
  width: 100%;
  padding-bottom: 2.4rem;
  padding-left: 0.8rem;
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

export const NotFoundContainer = styled.div`
  width: 100%;
  height: calc(100vh - 32rem);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.8rem;
  color: ${({ theme }) => theme.colors.black.main};

  p {
    font-size: 1.6rem;
    font-weight: 400;
    text-align: center;

    b {
      display: block;
    }
  }
`;
