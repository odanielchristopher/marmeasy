import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 1.6rem;
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

export const Main = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  width: 100%;
  height: calc(100vh - 15.0rem);

  img {
    width: 50.0rem;
  }
`;

