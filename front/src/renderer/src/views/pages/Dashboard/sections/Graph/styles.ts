import styled from 'styled-components';

export const Container = styled.div`
  grid-column: span 3;
  width: 100%;
  height: 100%;

  background-color: #fff;
  border-radius: 1rem;
  padding: 1.6rem;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;

  canvas {
    max-height: 100%; /* Garante que o gráfico não ultrapasse */
  }
`;
