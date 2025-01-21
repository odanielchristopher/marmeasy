import * as Checkbox from '@radix-ui/react-checkbox';
import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4.0rem;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2.0rem;

  div { width: 100% }

  div.quantity-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
      border-radius: 8px;
    }
  }
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  font-size: 1.6rem;

  strong {
    max-width: 20.0rem;
    text-align: center;
    font-weight: 700;
  }

  p {
    text-align: center;
  }
`;

export const CancelButton = styled.button`
  align-items: center;
  background: transparent;
  border: .1rem solid ${({ theme }) => theme.colors.black.main};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0rem .4rem 1.0rem 0rem #0000000A;
  color: ${({ theme }) => theme.colors.black.main};
  display: flex;
  font-size: 1.6rem;
  font-weight: 400;
  justify-content: center;
  height: 4.2rem;
  padding: 0 1.4rem;
  transition: background .2s ease-in;

  &:hover {
    border: .1rem solid ${({ theme }) => theme.colors.gray.main};
    color: ${({ theme }) => theme.colors.gray.main};
  }

  &:focus {
    outline: .1rem solid ${({ theme }) => theme.colors.green.main};
  }

  &:active {
    outline: none;
    border: .1rem solid ${({ theme }) => theme.colors.gray.light};
    color: ${({ theme }) => theme.colors.gray.light};
  }

  &[disabled] {
    background: ${({ theme }) => theme.colors.gray.lighter} !important;
    cursor: default !important;
  }
`;

export const Actions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.2rem;

  button {
    width: 100%;
    height: 4.8rem;
  }
`;

// ! mudar para um checkbos com react-hook-form
export const IngredientBox = styled.div`
  display: flex;
  width: 100%;
  align-items: left;
  gap: 20px;
  border-radius: 8px;
  border: 1px solid rgba(204, 204, 204, 0.53);
  padding: 16px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  /* &:hover {
    background-color: rgba(204, 204, 204, 0.53);
    transition: background-color 0.3s;
  } */
`;

export const CheckBoxStyle = styled(Checkbox.Root)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray.main};
  color: ${({ theme }) => theme.colors.gray.main};
  border-radius: 0.4rem;
  height: 1.8rem;
  width: 1.8rem;

  .indicator {
    display: flex;
    align-items: center;
    justify-content: center;
  } 
`;
