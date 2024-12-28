import styled from 'styled-components';

interface ContainerProps {
  $showAside: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: ${({ $showAside }) =>
    $showAside ? '7.0rem 1fr minmax(45.0rem, 40.0rem)' : '7.0rem 1fr'};
  grid-template-areas: ${({ $showAside }) =>
    $showAside ? '\'nav outlet aside\'' : '\'nav outlet\''};
  gap: 3.2rem;
`;

export const Main = styled.div`
  grid-area: outlet;
  overflow-y: auto;
  max-height: 100vh;
  width: 100%;
  margin-left: 2.4rem;
  padding-block: 2.4rem;
  &::-webkit-scrollbar {
      display: none;
    }
`;
