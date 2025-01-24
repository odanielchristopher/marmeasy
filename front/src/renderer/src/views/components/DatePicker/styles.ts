import styled from 'styled-components';

export const Caption = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Nav = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const NavButtonPrevious = styled.button`
  color: #065f46;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent !important;
`;

export const NavButtonNext = styled.button`
  color: #065f46;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent !important;
`;

export const HeadCell = styled.div`
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
  padding-top: 0.25rem;
  padding-bottom: 0.5rem;
`;

export const Button = styled.button`
  color: #374151;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  &:hover {
    background-color: #d1fae5;
  }
  border-radius: 9999px;
`;

export const DayToday = styled.div`
  background-color: #f3f4f6;
  font-weight: bold;
  color: #111827;
`;

export const DaySelected = styled.div`
  background-color: #065f46 !important;
  color: white;
  font-weight: 500;
`;