import styled, { css } from 'styled-components';

export interface RootProps {
  $justify?: 'center' | 'start' | 'end' | 'between';
}

const RootVariants = {
  start: css`
    justify-content: flex-start;
  `,
  center: css`
    justify-content: center;
  `,
  end: css`
    justify-content: flex-end;
  `,
  between: css`
    justify-content: space-between;
  `,
};

export const Root = styled.button<RootProps>`
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 1rem;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 1.2rem;
  transition: all ease-in 100ms;
  width: 30rem;
  height: 13.2rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.orange.light};
    scale: calc(103%);
  }

  ${({ $justify }) => RootVariants[$justify || 'between']}

  flex: 1 1 20.0rem;

  @media (max-width: 1069px) {
    flex: 1 1 30rem;
  }

  @media (max-width: 757px) {
    flex: 1 1 22rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
`;

export interface TitleProps {
  align?: 'center' | 'start' | 'end';
  type?: 'primary' | 'secondary';
}

const TitleVariants = {
  start: css`
    text-align: start;
  `,
  center: css`
    text-align: center;
  `,
  end: css`
    text-align: end;
  `,
  primary: css`
    color: ${({ theme }) => theme.colors.black.main};
  `,
  secondary: css`
    color: ${({ theme }) => theme.colors.gray.main};
    font-weight: 600;
  `,
};

export const Title = styled.h3<TitleProps>`
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 150.007%;

  ${({ align }) => TitleVariants[align || 'start']};
  ${({ type }) => TitleVariants[type || 'primary']};
`;

export const MainInfo = styled.strong`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 150.007%;
  max-width: 18rem;
`;
