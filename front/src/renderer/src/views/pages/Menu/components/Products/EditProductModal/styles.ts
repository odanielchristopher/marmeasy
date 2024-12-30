import styled from 'styled-components';

export const Container = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.gray.light};
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 120%;
  }
`;

export const ImageSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;



export const DeleteButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 50%;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;
