import styled, { css } from 'styled-components';

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
  overflow: auto;

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
  margin-top: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  padding-bottom: 3.2rem;
  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.gray.lighter};
`;

interface ActionsButtonProps {
  $isActive?: boolean;
}

export const ActionsButton = styled.button<ActionsButtonProps>`
  background-color: transparent;
  border: 0.1rem solid ${({ theme }) => theme.colors.orange.light};
  border-radius: 2rem;
  color: ${({ theme }) => theme.colors.orange.light};
  font-size: 1.2rem;
  font-weight: 400;
  padding: 0.4rem 2.4rem;
  transition: all ease-in 0.1s;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.colors.orange.light};
    color: #fff;
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      background: ${({ theme }) => theme.colors.orange.light};
      color: #fff;
    `}
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
