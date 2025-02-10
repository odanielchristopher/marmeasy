import * as RdxToogleGroup from '@radix-ui/react-toggle-group';
import styled from 'styled-components';

export const StyledRdxToogleGroupItem = styled(RdxToogleGroup.Item)`
  padding: 1.1rem;
  outline: none;
  cursor: pointer;
  transition: background ease 0.3s;
  font-size: 1.6rem;
  background: #fff;
  border: 2px solid transparent;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);

  &[data-state='on'] {
    background: rgba(245, 245, 245, 0.78);

    &:first-child {
      border-color:rgba(204, 204, 204, 0.72);
    }

    &:last-child {
      border-color:rgba(204, 204, 204, 0.72);
    }
  }

  &:hover {
    background: #f0f0f0;
  }

  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
