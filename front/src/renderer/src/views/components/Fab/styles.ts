import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  right: 2.4rem;
  bottom: 2.4rem;
`;

export const StyledButton = styled.button`
  align-items: center;
  background: ${({ theme }) => theme.colors.green.main};
  border-radius: 50%;
  color: #FFF;
  display: flex;
  height: 4.8rem;
  justify-content: center;
  padding: 1.2rem;
  width: 4.8rem;
  border: none;

  &[data-state="open"] {
    transform: rotate(90deg);
  }
`;

export const StyledItem = styled.button`
  width: 100%;
  gap: .8rem;
`;
