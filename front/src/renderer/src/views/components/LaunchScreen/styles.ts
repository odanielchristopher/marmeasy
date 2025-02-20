import styled, { css, keyframes } from 'styled-components';

interface IIsLeaving {
  $isLeaving: boolean;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const Container = styled.div<IIsLeaving>`
  animation: ${fadeIn} 0.3s forwards;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh);
  background-color: ${({ theme }) => theme.colors.orange.light};

  ${({ $isLeaving }) =>
    $isLeaving &&
    css`
      animation: ${fadeOut} 0.3s forwards;
    `}

  div {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    img {
      width: 25rem;
    }
  }
`;
