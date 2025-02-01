import * as Checkbox from '@radix-ui/react-checkbox';
import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4rem;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.2 rem;

  .ingredientLabel {
    border: 1px solid ${({ theme }) => theme.colors.gray.lighter};
    border-radius: 1rem;
    color: ${({ theme }) => theme.colors.gray.light};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 1.4rem;
    line-height: 150%;

    padding: 1.6rem;
    margin-top: 10px;
  }

  .error {
    color: ${({ theme }) => theme.colors.red.main};
    font-size: 1.2rem;
    margin-top: 0.4rem;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
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

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  margin-top: 1.6rem;
  width: 100%;

  div {
    width: 100%;
    text-align: right;

    input {
      width: 50%;
    }

    .error {
      justify-content: end;
    }
  }
`;
