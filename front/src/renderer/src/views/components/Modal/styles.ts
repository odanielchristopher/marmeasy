import * as Dialog from '@radix-ui/react-dialog';
import styled, { keyframes } from 'styled-components';

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

export const StyledRdxDialogContent = styled(Dialog.Content)`
  animation: ${contentShow} 0.3s forwards;
  background: #FFF;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0rem .4rem 0rem rgba(0, 0, 0, 0.04);
  padding: 2.4rem;
  width: 100%;
  max-width: 45.0rem;

  position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
  z-index: 50;
  outline: none;
`;

export const StyledRdxDialogOverlay = styled(Dialog.Overlay)`
  animation: ${overlayShow} 0.3s forwards;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(.25rem);
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
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  border-radius: 50%;
  display: flex;
  width: 48px;
  height: 48px;
  padding: 12px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2.0rem;
  font-style: normal;
  font-weight: 600;
`;
