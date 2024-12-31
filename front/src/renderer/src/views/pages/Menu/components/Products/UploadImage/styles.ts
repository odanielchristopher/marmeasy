import styled from 'styled-components';

export const Container = styled.div`
  max-width: 42.0rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-bottom: 1.4rem;
  border: 1px solid #CCC;
  border-radius: 1.0rem;
  position: relative;
`;

export const NoContentImage = styled.div`
  width: 100%;
  height: 160px;

  display: flex;
  align-items: center;
  justify-content: center;
  background: #FAFAFA;

  border-radius: 1.0rem 1.0rem 0 0;
`;

export const ContainerImg = styled.div`

  button {
    align-items: center;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.orange.main};
    display: flex;
    font-size: 16px;
    font-weight: 600;
    gap: 8px;
    justify-content: center;
    padding: 1.4rem;
    width: 100%;
  }
`;

export const Preview = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;

  border-radius: 1.0rem 1.0rem 0 0;
`;

export const LoaderOverlay = styled.div`
  position: absolute;
  inset: 0;
`;
