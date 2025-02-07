import styled, { css } from 'styled-components';

export interface RootProps {
  $hasAction?: boolean;
}

export const Root = styled.div<RootProps>`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 2px solid transparent;
  border-radius: 1rem;
  padding: 0.4rem;

  ${({ $hasAction }) =>
    $hasAction &&
    css`
      cursor: pointer;
      transition: all ease-in 100ms;

      &:hover {
        border-color: ${({ theme }) => theme.colors.orange.light};
        border-radius: 1rem;
        scale: calc(103%);
      }
    `}

  & + & {
    margin-top: 0.8rem;
  }
`;

export interface BoxProps {
  $justify?: 'center' | 'start' | 'end' | 'between';
  $direction?: 'column' | 'row';
  $align?: 'center' | 'start' | 'end';
  $gap?: number;
}

const boxVariants = {
  justify_start: css`
    justify-content: flex-start;
  `,
  justify_center: css`
    justify-content: center;
  `,
  justify_end: css`
    justify-content: flex-end;
  `,
  justify_between: css`
    justify-content: space-between;
  `,
  column: css`
    flex-direction: column;
  `,
  row: css`
    flex-direction: row;
  `,
  align_start: css`
    align-items: flex-start;
  `,
  align_center: css`
    align-items: center;
  `,
  align_end: css`
    align-items: flex-end;
  `,
};

export const Box = styled.div<BoxProps>`
  display: flex;
  gap: ${({ $gap }) => ($gap ? `${$gap / 10}rem` : '.8rem')};
  ${({ $justify }) =>
    $justify
      ? boxVariants[`justify_${$justify}`]
      : boxVariants['justify_start']}
  ${({ $align }) =>
    $align ? boxVariants[`align_${$align}`] : boxVariants['align_start']}
  ${({ $direction }) => boxVariants[$direction || 'row']}
`;

export const Title = styled.h4`
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 150%;
`;

export interface CurrencyProps {
  color?: 'default' | 'success' | 'danger';
}

const currencyVariants = {
  default: css`
    color: ${({ theme }) => theme.colors.black.main};
  `,
  success: css`
    color: ${({ theme }) => theme.colors.green.main};
  `,
  danger: css`
    color: ${({ theme }) => theme.colors.red.main};
  `,
};

export const Currency = styled.strong<CurrencyProps>`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 150%;
  ${({ color }) => currencyVariants[color || 'default']}
`;

export interface HelpProps {
  $type?: 'primary' | 'secondary';
}

const helpVariants = {
  primary: css`
    color: ${({ theme }) => theme.colors.black.main};
  `,
  secondary: css`
    color: ${({ theme }) => theme.colors.gray.light};
  `,
};

export const Help = styled.span<HelpProps>`
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 150%;
  ${({ $type }) => helpVariants[$type || 'primary']}
`;
