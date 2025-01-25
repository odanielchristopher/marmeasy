import * as RdxTabs from '@radix-ui/react-tabs';
import styled from 'styled-components';

export const StyledRdxTabTrigger = styled(RdxTabs.Trigger)`
  background: #fff;
  border: none;
  color: ${({ theme }) => theme.colors.orange.light};
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 0.8rem 0.8rem 0rem 0rem;
  padding: 1.6rem 6.4rem;

  &[data-state='inactive'] {
    background: transparent;
    color: ${({ theme }) => theme.colors.gray.light};
    font-size: 1.6rem;
    font-weight: 400;
  }
`;

export const StyledRdxTabList = styled(RdxTabs.List)`
  background-color: transparent;
  border-bottom: 1px solid hsla(0, 0.00%, 80.00%, 0.40);
`;
