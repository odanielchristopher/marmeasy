import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  padding-block: 1.6rem;
  padding-right: 2rem;
  width: 100%;
  height: 100%;
`;

export const FiltersContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
  width: 100%;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 1.6rem;
  width: 100%;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
`;

export const GraphSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;
  width: 100%;
  height: 58rem;
  margin-bottom: 4.2rem;

  @media (max-width: 1170px) {
    grid-template-columns: repeat(2, 1fr); /* 2 colunas */
    grid-template-rows: repeat(4, 1fr); /* 4 linhas */
    height: auto; /* Ajusta altura automaticamente */

    & > :first-child {
      grid-column: span 2; /* Ocupa as duas colunas */
      grid-row: span 2; /* Ocupa as duas primeiras linhas */
    }

    & > :nth-child(2) {
      grid-column: span 2; /* Ocupa as duas colunas */
      grid-row: span 2; /* Ocupa as duas últimas linhas */
    }

    height: 60.0rem;
  }
`;

