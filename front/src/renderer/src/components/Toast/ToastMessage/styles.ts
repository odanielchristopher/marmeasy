import styled, { css } from 'styled-components';

interface IContainer {
  type?: string
}

const containerVariants = {
  default: css`
    background: ${({ theme }) => theme.colors.orange.main};
  `,
  sucess: css`
    background: ${({ theme }) => theme.colors.green.main};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.red.main};
  `
};

export const Container = styled.div<IContainer>`
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: .0rem 2.0rem 2.0rem -1.6rem rgba(0, 0, 0, 0.25);;
  color: #FFF;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 1.6rem 3.2rem;

  ${({ type }) => containerVariants[type || 'default']}

  & + & {
    margin-top: 1.2rem;
  }

  svg {
    margin-right: .8rem;
  }
`;
