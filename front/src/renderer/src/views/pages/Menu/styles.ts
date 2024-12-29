import styled from 'styled-components';

export const Container = styled.div`
  padding-block: 1.6rem;
  padding-right: 5.0rem;
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
  margin-top: 4.0rem;
  width: 100%;
`;

