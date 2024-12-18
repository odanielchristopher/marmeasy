import styled from 'styled-components';

export const Form = styled.form`
  margin-top: 4.0rem;

  p {
    color: ${({ theme }) => theme.colors.black.main};
    font-size: 1.6rem;
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
    margin-top: 2.0rem;
    width: 100%;
    height: 4.8rem;

    background: ${({ theme }) => theme.colors.orange.light};

    &:hover {
      background: ${({ theme }) => theme.colors.orange.main};
    }
  }
`;
