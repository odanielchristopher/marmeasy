import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  grid-column: span 1;
  padding: 1.6rem;

  max-height: 60rem;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Estilização do "trilho" da scrollbar */
  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Cor de fundo */
    border-radius: 10px; /* Bordas arredondadas */
  }

  /* Estilização do "thumb" da scrollbar (a parte arrastável) */
  &::-webkit-scrollbar-thumb {
    background: #ddd; /* Cor do thumb */
    border-radius: 10px;
  }

  /* Hover no thumb */
  &::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 150.007%;
  margin-bottom: 0.8rem;
`;

export const Separator = styled.div`
  height: 2px;
  width: 100%;
  margin-block: 1.6rem;
  border: 1px dashed #ccc;
`;
