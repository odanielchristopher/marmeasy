import styled from 'styled-components';

export const FormModal = styled.form`
  p {
    color: ${({ theme }) => theme.colors.gray.main};
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
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
  }
`;

export const BalanceContainer = styled.div`
  margin-bottom: 1.2rem;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .label {
    color: ${({ theme }) => theme.colors.gray.main};
  }

  .input {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    width: 18rem;

    span {
      color: ${({ theme }) => theme.colors.gray.main};
      letter-spacing: -0.5px;
    }
  }
`;
