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
  height: 45.0rem;
`;
