import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;

  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 2.4rem;
  width: 40.0rem;

  h1 {
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 3.2rem;
    margin-bottom: .6rem;
  }

  p {
    color: ${({ theme }) => theme.colors.gray.main};
    font-size: 1.4rem;
    line-height: 2.0rem;
    margin-bottom: 2.4rem;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 2.4rem;

  button {
    width: 100%;
  }
`;
