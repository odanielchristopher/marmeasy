import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.orange.light};
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
`;
