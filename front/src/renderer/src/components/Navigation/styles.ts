import styled, { css } from 'styled-components';

interface ILinkNavigation {
  active?: boolean
}

export const Container = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.orange.light};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 4.8rem);
  margin: 2.4rem auto;
  padding: 1.6rem 1rem;
  width: min-content;
`;

export const LogoContainer = styled.div`
  height: 5.6rem;
  margin-bottom: 6.4rem;
  width: 5.6rem;

  img {
    height: 100%;
    width: 100%;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80%;
`;

export const FootContainer = styled.div`
  justify-self: flex-end;
  align-self: center;
`;

export const LinkNavigation = styled.button<ILinkNavigation>`
  align-items: center;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.black.main};
  display: flex;
  flex-direction: column;
  gap: .8rem;
  transition: all ease-in 100ms;

  span {
    font-size: 1.2rem;
    font-weight: 500;
  }

  & + & {
    margin-top: 3.2rem;
  }

  &:hover {
    color: #fff;

    span {
      text-decoration: underline;
    }
  }

  ${({ active }) =>
    active &&
    css`
      color: #fff;

      span {
        text-decoration: underline;
      }
    `}
`;
