import { DayPicker } from 'react-day-picker';
import styled from 'styled-components';

import 'react-day-picker/dist/style.css';

export const StyledSpan = styled.span`
  letter-spacing: -0.408px;
  font-weight: 500;
  color: #212529;
`;

export const StyledDayPicker = styled(DayPicker)`
  .caption {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav {
    display: flex;
    gap: 0.4rem;
  }

  .nav_button {
    color: #222 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none !important ;
    background: transparent !important;
  }

  .head_ceil {
    text-transform: uppercase;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.black.main};
    font-weight: 500;
    padding-top: 0.4rem;
    padding-bottom: 0.8rem;
  }

  .button {
    color: ${({ theme }) => theme.colors.gray.main};
    cursor: pointer;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;

    &:hover {
      background-color: ${({ theme }) => theme.colors.orange.lighter};
      color: #fff;
    }
  }

  .day_today {
    background: ${({ theme }) => theme.colors.gray.lighter} !important;
    color: ${({ theme }) => theme.colors.black.light};
    font-weight: 700;
  }

  .day_selected {
    background: ${({ theme }) => theme.colors.orange.light} !important;
    color: #fff !important;
    font-weight: 600;
  }
`;
