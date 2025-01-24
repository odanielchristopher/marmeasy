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
