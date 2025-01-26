import * as Checkbox from '@radix-ui/react-checkbox';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  width: 100%;
  max-width: 42rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      background: transparent;
      border: none;
      color: ${({ theme }) => theme.colors.orange.main};
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 150%;
    }
  }

  .filter {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    span {
      color: ${({ theme }) => theme.colors.gray.light};
      font-size: 1.4rem;
      line-height: 150%;
    }

    input {
      border: 1px solid ${({ theme }) => theme.colors.gray.lighter};
      border-radius: 1rem;
      font-size: 1.4rem;
      line-height: 150%;
      padding: 1.6rem;
      width: 100%;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    width: 100%;
    max-height: 35rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #888;

      &:hover {
        background: #555;
      }
    }

    .ingredient-loader {
      height: 9.4rem;
    }

    .item {
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
    }
  }
`;

export const StyledRdxCheckbox = styled(Checkbox.Root)`
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
