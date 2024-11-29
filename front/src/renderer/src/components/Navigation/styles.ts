import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.orange.light};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.16);
  height: calc(100vh - 4.8rem);
  margin: 2.4rem auto;
  padding: 1.0rem;
  width: min-content;
`;
