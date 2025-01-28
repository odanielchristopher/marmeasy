import Button from '@renderer/views/components/Button';
import { ButtonProps } from 'react-day-picker';
import styled from 'styled-components';

export const Form = styled.form`
`;

export const ValueContainer = styled.div`
  margin-bottom: 1.2rem;
  margin-inline: auto;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  .label {
    color: ${({ theme }) => theme.colors.gray.main};
  }

  .input-container {
    align-items: center;
    border-bottom: 0.1rem solid #ccc;
    display: flex;
    gap: 2.4rem;
    justify-content: space-between;
    width: 100%;

    .input {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      max-width: 60%;

      span {
        color: ${({ theme }) => theme.colors.gray.main};
        letter-spacing: -0.5px;
      }
    }

    .label-btn {
      align-items: center;
      background: ${({ theme }) => theme.colors.orange.light};
      border-radius: 0.8rem;
      border: none;
      color: #fff;
      font-size: 1.4rem;
      font-weight: 600;
      display: flex;
      gap: 0.6rem;
      height: 3rem;
      padding: 0.6rem 1.2rem;
      width: fit-content;
      margin: 0;
      transition: all ease-in 100ms;

      &:hover {
        background: ${({ theme }) => theme.colors.orange.lighter};
      }

      &:active {
        background: ${({ theme }) => theme.colors.orange.main};
      }
    }
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: .4rem;

  .label {
    color: ${({ theme }) => theme.colors.gray.main};
  }
`;

export const SubmitButton = styled(Button)<ButtonProps>`
  height: 4.8rem;
  margin-top: 2.4rem;
  width: 100%;
`;
