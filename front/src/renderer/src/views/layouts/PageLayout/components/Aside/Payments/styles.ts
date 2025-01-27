import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1.6rem;
`;

export const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;

  h3 {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 140%;
  }
`;

export const AddButton = styled.button`
  align-items: center;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.orange.light};
  border-radius: .6rem;
  color: ${({ theme }) => theme.colors.orange.light};
  display: flex;
  justify-content: center;
  transition: all ease-in 100ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.orange.light};
    color: #FFF;
  }
`;
