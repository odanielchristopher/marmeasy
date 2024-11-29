import styled from 'styled-components';

export const Container = styled.div`
  /* background-color: ${({ theme }) => theme.colors.orange.light}; */
  background-color: ${({ theme }) => theme.background};

  align-items: center;
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100vh;
`;
