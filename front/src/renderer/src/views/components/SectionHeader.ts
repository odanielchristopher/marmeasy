import styled from 'styled-components';

export const SectionHeader = styled.header`
  margin-bottom: 3.6rem;
  div {
    align-items: center;
    display: flex;

    h1 {
      color: ${({ theme }) => theme.colors.black.light};
      font-size: 2.8rem;
      font-weight: 600;
      margin-left: 1rem;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.gray.light};
    margin-top: 0.4rem;
  }
`;
