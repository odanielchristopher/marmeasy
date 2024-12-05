import styled from 'styled-components';

export const Form = styled.form`

`;

export const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 3.2rem;
  margin-bottom: 0.6rem;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.gray.main};
  font-size: 1.4rem;
  line-height: 2rem;
  margin-bottom: 2.4rem;
`;

export const ButtonContainer = styled.div`
  margin-top: 2.4rem;

  button {
    width: 100%;
  }
`;
