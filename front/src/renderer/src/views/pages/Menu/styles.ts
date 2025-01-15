import styled from 'styled-components';

export const Container = styled.div`
  padding-block: 1.6rem;
  padding-right: 5.0rem;
`;

export const Main = styled.main`
  margin-top: 4.0rem;
  width: 100%;
`;

export const EmptyImageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.8rem;
  height: 50vh;

  img {
    width: 300px;
  }
`;
