import styled from 'styled-components';

export const Container = styled.div`
  & + & {
    margin-top: 2.4rem;
  }

  &:last-child {
    margin-bottom: 3.2rem;
  }
`;
