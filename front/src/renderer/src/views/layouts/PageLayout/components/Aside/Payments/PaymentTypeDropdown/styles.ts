import { FaChevronDown } from 'react-icons/fa6';
import styled, { css } from 'styled-components';

export const TriggerButton = styled.button`
  align-items: center;
  background: #FFF;
  border: .1rem solid #CCC;
  border-radius: 10px;
  display: flex;
  width: 100%;
  gap: .8rem;
  padding: .4rem 1.2rem;
  position: relative;

  &[data-state="open"] {
    border-color: ${({ theme }) => theme.colors.orange.light};
  }

  span {
    font-size: 1.6rem;
    font-weight: 500;
  }
`;

export const ArrowIcon = styled(FaChevronDown)`
  position: absolute;
  right: 1.4rem;
  top: 50%;
  transform: translateY(-50%);
`;

interface StyledItemProps {
  $selected?: boolean;
}

export const StyledList = styled.div`
  width: var(--radix-dropdown-menu-trigger-width);
`;

export const StyledItem = styled.button<StyledItemProps>`
  width: 100%;
  gap: 0.8rem;
  transition: background 0.3s;
  font-size: 1.6rem;
  font-weight: 400;

  &:hover {
    font-weight: 600;
    transition: background 0.3s;
  }

  ${({ $selected }) => $selected && css`
    font-weight: 600;
  `}
`;
