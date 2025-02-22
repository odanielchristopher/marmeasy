import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  text-align: center;

  div.infoOrder {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border: 2px solid ${({ theme }) => theme.colors.orange.main};
    padding: 1rem;
    border-radius: 0.8rem;

    div.left {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      text-align: left;
      color: ${({ theme }) => theme.colors.gray.main};
    }

    div.right {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      text-align: right;
    }

  }

  footer{
    width: 100%;

    button {
      width: 100%;
      background-color: ${({ theme }) => theme.colors.red.main};
      opacity: 1;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.7;
        transition: opacity 0.2s;
        background-color: ${({ theme }) => theme.colors.red.main};
      }
  }

  }

  `;
