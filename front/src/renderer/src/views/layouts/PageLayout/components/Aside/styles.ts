import styled from 'styled-components';

interface ContainerProps {
  $area: string;
}

export const Container = styled.aside<ContainerProps>`
  background-color: #fff;
  border-radius: ${({ theme }) => theme.borderRadius};
  height: calc(100vh - (${({ theme }) => theme.margin} * 2));
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
  padding: 2.4rem 2rem;
  margin: 2.4rem;
  overflow-y: auto;

  grid-area: ${({ $area }) => $area};
`;

export const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;

  img {
    width: 20rem;
  }
`;

export const Actions = styled.div`
  margin-top: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  padding-bottom: 3.2rem;
  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.gray.lighter};
`;

export const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 83%;
`;

export const Empty = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  height: 100%;
  justify-content: center;
  max-width: 30rem;

  p {
    font-size: 1.6rem;
    text-align: center;
    line-height: 140%;
    color: ${({ theme }) => theme.colors.gray.light};

    b {
      display: block;
      font-weight: 600;
    }
  }
`;
