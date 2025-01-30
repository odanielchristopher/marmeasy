import styled from 'styled-components';

export const Container = styled.ul`
  margin-top: 1.8rem;
`;

export const PaymentContainer = styled.button`
  align-items: center;
  border: none;
  background: transparent;
  display: flex;
  gap: 1.2rem;
  padding: 1rem;
  width: 100%;
  transition: scale ease-in 100ms;

  & + & {
    border-top: 1.25px solid #ccc;
  }

  &:focus {
    border-radius: 1rem;
    border: 1.5px solid ${({ theme }) => theme.colors.orange.light};
  }

  &:hover {
    scale: calc(102%);
    border-radius: 1rem;
    border: 1.5px solid ${({ theme }) => theme.colors.orange.light};
  }
`;

export const PaymentInfosContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 80%;

  .left {
    align-items: flex-start;
    display: flex;
    flex-direction: column;

    strong {
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 150%;
      letter-spacing: -0.05rem;
    }

    span {
      color: ${({ theme }) => theme.colors.gray.light};
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 150%;
    }
  }

  .value {
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.05rem;
  }
`;
