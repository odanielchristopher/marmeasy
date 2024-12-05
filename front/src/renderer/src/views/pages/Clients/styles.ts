import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1.6rem;
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
    color: ${({ theme }) => theme.colors.gray.lighter};
    margin-top: .4rem;
  }
`;
