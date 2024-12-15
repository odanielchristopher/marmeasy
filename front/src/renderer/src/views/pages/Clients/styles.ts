import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1.6rem;
  width: 100%;
`;

export const Main = styled.div`
  position: relative;
  grid-area: main;
`;

export const Header = styled.header`
  div {
    align-items: center;
    display: flex;

    h1 {
      color: ${({ theme }) => theme.colors.black.light};
      font-size: 2.8rem;
      font-weight: 600;
      margin-left: 1.0rem;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.gray.light};
    margin-top: .4rem;
  }
`;

export const Content = styled.div`
  overflow-y: auto;
  width: 100%;
  padding: 1.2rem;
  display: flex;
  gap: 1.6rem;
  flex-wrap: wrap;
`;






