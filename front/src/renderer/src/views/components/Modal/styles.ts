import * as Dialog from '@radix-ui/react-dialog';
import styled, { css, keyframes } from 'styled-components';

const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const contentShow = keyframes`
	from {
		opacity: 0;
		transform: translate(-50%, -48%) scale(0.96);
	}
	to {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}
`;

export interface DialogContentProps {
  $maxWidth?: string;
  $maxHeight?: number;
}

export const StyledRdxDialogContent = styled(
  Dialog.Content,
)<DialogContentProps>`
  animation: ${contentShow} 0.3s forwards;
  background: #fff;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0rem 0.4rem 0rem rgba(0, 0, 0, 0.04);
  padding: 2.4rem;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || '45.0rem'};
  max-height: 92vh;
  min-height: 45rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  outline: none;

  ${({ $maxHeight }) =>
    $maxHeight &&
    css`
      max-height: ${$maxHeight / 10}rem;
    `}
`;

export const StyledRdxDialogOverlay = styled(Dialog.Overlay)`
  animation: ${overlayShow} 0.3s forwards;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(0.25rem);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;

export const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3.2rem;
`;

export const CloseButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  height: 4.8rem;
  width: 4.8rem;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
`;

export const ActionContainer = styled.div`
  width: 4.8rem;
  height: 4.8rem;
`;
