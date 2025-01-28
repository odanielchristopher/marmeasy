import * as RdxPopover from '@radix-ui/react-popover';
import styled, { keyframes } from 'styled-components';

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

export const StyledRdxPopoverTrigger = styled(RdxPopover.Trigger)`
  outline: none;
  cursor: pointer;
`;

export const StyledRdxPopoverContent = styled(RdxPopover.Content)`
  background: #fff;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0px 0px 6.8px 0px rgba(0, 0, 0, 0.2);
  padding: 0.8rem;
  pointer-events: auto;
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
