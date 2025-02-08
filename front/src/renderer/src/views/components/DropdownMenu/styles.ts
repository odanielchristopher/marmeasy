import styled, { keyframes } from 'styled-components';

import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';

const SlideUpAndFade = keyframes`
	from {
		opacity: 0;
		transform: translateY(2px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}

`;
const SlideRightAndFade = keyframes`
	from {
		opacity: 0;
		transform: translateX(-2px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}

`;
const SlideDownAndFade = keyframes`
	from {
		opacity: 0;
		transform: translateY(-2px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

const SlideLeftAndFade = keyframes`
	from {
		opacity: 0;
		transform: translateX(2px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
`;

export const StyledRdxDropdownMenuTrigger = styled(RdxDropdownMenu.Trigger)`
  outline: none;
  cursor: pointer;
`;

export const StyledRdxDropdownMenuContent = styled(RdxDropdownMenu.Content)`
  background: #fff;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0px 0px 6.8px 0px rgba(0, 0, 0, 0.2);
  padding: 0.8rem;
  z-index: 50;

  > * + * {
    margin-top: 0.8rem;
  }

  &[data-side='top'] {
    animation: ${SlideUpAndFade} 0.1s forwards;
  }
  &[data-side='right'] {
    animation: ${SlideLeftAndFade} 0.1s forwards;
  }
  &[data-side='bottom'] {
    animation: ${SlideDownAndFade} 0.1s forwards;
  }
  &[data-side='left'] {
    animation: ${SlideRightAndFade} 0.1s forwards;
  }
`;

export const StyledRdxDropdownMenuItem = styled(RdxDropdownMenu.Item)`
  color: ${({ theme }) => theme.colors.black.main};
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  display: flex;
  font-size: 1.4rem;
  outline: none;
  min-height: 4.8rem;
  padding: 0.8rem;
  width: 100%;

  &:hover {
    background: #f0f0f0;
  }

  &[data-highlighted] {
    background: #f0f0f0;
  }
`;
