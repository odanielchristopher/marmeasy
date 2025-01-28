import styled from 'styled-components';

export const Form = styled.form`
  margin-top: 4rem;

  p {
    color: ${({ theme }) => theme.colors.black.main};
    font-size: 1.4rem;
    margin-bottom: 1.6rem;
  }

  .dividerInput {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 1.2rem;
    align-items: center;
    margin-top: 1.2rem;

    & > div {
      margin-top: 0;
    }

    & > div:first-child {
      width: 45%;
    }

    & > div:last-child {
      width: 100%;
    }
  }

  button {
    margin-top: 2rem;
    width: 100%;
    height: 4.8rem;

    background: ${({ theme }) => theme.colors.orange.light};

    &:hover {
      background: ${({ theme }) => theme.colors.orange.main};
    }
  }
`;

export const BalanceContainer = styled.div`
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
      color: #FFF;
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
