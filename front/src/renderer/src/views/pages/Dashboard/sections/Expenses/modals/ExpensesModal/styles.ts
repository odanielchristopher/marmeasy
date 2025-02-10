import styled from 'styled-components';

export const ListPerDate = styled.div`
  & + & {
    margin-top: 2.4rem;
  }

  &:last-child {
    margin-bottom: 3.2rem;
  }
`;

export const AddButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 2px solid transparent;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.orange.light};
  display: flex;
  justify-content: center;
  padding: 1.2rem;
  transition: all ease-in 100ms;

  &:hover,
  &:focus {
    color: #fff;
    border-color: ${({ theme }) => theme.colors.orange.light};
    background-color: ${({ theme }) => theme.colors.orange.light};
  }
`;
