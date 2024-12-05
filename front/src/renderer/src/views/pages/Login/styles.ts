import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  width: 40rem;

  a {
    align-self: center;
    color: ${({ theme }) => theme.colors.black.main};
    font-size: 1.4rem;
    margin-top: 1.2rem;

    &:hover {
      color: blue;
    }
  }
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
