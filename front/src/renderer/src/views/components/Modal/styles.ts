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

export const 
StyledRdxDialogContent = styled(Dialog.Content)`
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
  justify-content: center; //mudança
  width: 100%;
  margin-bottom: 3.2rem;
`;

export const CloseButton = styled.span` //button -> span
  /* background: red;
  border: none;
  border-radius: 50%;
  display: flex;
  width: 48px;
  height: 48px;
  padding: 12px;
  justify-content: center;
  align-items: center; */
  cursor: pointer;

  /* span { */
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray.main};
    transition: color .3s;

    &:hover {
      color: ${({ theme }) => theme.colors.gray.light};
      transition: color .3s;
    }
  /* } */
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

export const ActionContainer = styled.div`
  /* width: 4.8rem;
  height: 4.8rem; */

  button.saveClient {
    background-color: ${({ theme }) => theme.colors.orange.light};
    color: #FFF;
    border-radius: 10px;
    padding: 14px;
    border: none;
    font-weight: 600;
    font-size: 16px;
    transition: background .3s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.orange.dark};
      transition: background .3s;
    }
  }
`;
