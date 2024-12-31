import styled from 'styled-components';

const widthBreak = '1024px';

export const Container = styled.div`
  @media (max-width: ${widthBreak}) {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  h3 {
    color: ${({ theme }) => theme.colors.gray.light};
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 120%;
  }
`;

export const Content = styled.main`
  width: 100%;

  @media (max-width: ${widthBreak}) {
    flex-wrap: nowrap;
    align-self: center;
    max-width: 42.0rem;
    max-height: 100%;
  }

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 3.2rem;
  max-height: 75rem;
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  button {
    width: 20rem;
  }

  @media (max-width: ${widthBreak}) {
    button {
      width: 100%;
    }
  }
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const InputsContainer = styled.div`
  width: 100%;
  max-width: 42rem;

  p {
    color: ${({ theme }) => theme.colors.gray.light};
    font-size: 1.4rem;
    line-height: 150%;
    margin-top: 0.8rem;
  }
`;
