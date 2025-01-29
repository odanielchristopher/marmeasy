import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin-top: 1.6rem;
  width: 100%;
  height: 100%;

  .list-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

interface LoaderContainerProps {
  $isFetchingNextPage?: boolean;
}

export const LoaderContainer = styled.div<LoaderContainerProps>`
  height: 70px;
  width: 100%;

  ${({ $isFetchingNextPage }) => !$isFetchingNextPage && css`
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
  `}
`;

export const NotFoundContainer = styled.div`
  width: 100%;
  height: calc(100vh - 32rem);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.8rem;
  color: ${({ theme }) => theme.colors.black.main};

  p {
    font-size: 1.6rem;
    font-weight: 400;
    text-align: center;

    b {
      display: block;
    }
  }
`;
