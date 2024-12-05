import styled, { css, keyframes } from 'styled-components';

interface IIsLeaving {
  $isLeaving: boolean
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

const scaleOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0); }
`;

export const Overlay = styled.div<IIsLeaving>`
  align-items: center;
  animation: ${fadeIn} 0.3s forwards;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(.4rem);
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 2;

  ${({ $isLeaving }) => $isLeaving && css`animation: ${fadeOut} 0.2s forwards;`}
`;

export const Container = styled.div<IIsLeaving>`
  animation: ${scaleIn} 0.3s;
  background: #FFF;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0rem .4rem 0rem rgba(0, 0, 0, 0.04);
  padding: 2.4rem;
  width: 100%;
  max-width: 45.0rem;

  ${({ $isLeaving }) => $isLeaving && css`animation: ${scaleOut} 0.2s forwards;`}
`;
