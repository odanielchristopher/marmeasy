import styled, { css, keyframes } from 'styled-components';

interface IContainer {
  type?: string
  $isLeaving: boolean
}

const messageIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(10.0rem);
  }

  to {
    opacity: 1;
    transform: translateX(0rem);
  }
`;

const messageOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0rem);
  }

  to {
    opacity: 0;
    transform: translateX(10.0rem);
  }
`;

const containerVariants = {
  default: css`
    background: ${({ theme }) => theme.colors.orange.main};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.green.main};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.red.main};
  `,
};

export const Container = styled.div<IContainer>`
  align-items: center;
  animation: ${messageIn} 0.3s;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: .0rem 2.0rem 2.0rem -1.6rem rgba(0, 0, 0, 0.25);;
  color: #FFF;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 1.6rem 3.2rem;

  ${({ $isLeaving }) => $isLeaving && css`
    animation: ${messageOut} 0.3s forwards;
  `}

  ${({ type }) => containerVariants[type || 'default']}

  & + & {
    margin-top: 1.2rem;
  }

  svg {
    margin-right: .8rem;
  }
`;
