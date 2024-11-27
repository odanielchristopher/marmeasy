import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;

  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 2.4rem;
  width: 40rem;

  h1 {
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 3.2rem;
    margin-bottom: 0.6rem;
  }

  p {
    color: ${({ theme }) => theme.colors.gray.main};
    font-size: 1.4rem;
    line-height: 2rem;
    margin-bottom: 2.4rem;
  }

  span {
    cursor: pointer;
    display: block;
    font-size: 1.2rem;
    margin-top: 1.0rem;
    text-align: center;
    width: 100%;

    &:hover {
      color: blue;
      text-decoration: underline;
    }
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 2.4rem;

  button {
    width: 100%;
  }
`;

