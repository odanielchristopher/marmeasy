import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  p {
    color: ${({ theme }) => theme.colors.gray.main};
    font-size: 1.4rem;
    margin-bottom: 1.6rem;
  }

  button {
    margin-top: 2rem;
    width: 100%;
    height: 4.8rem;
  }
`;
