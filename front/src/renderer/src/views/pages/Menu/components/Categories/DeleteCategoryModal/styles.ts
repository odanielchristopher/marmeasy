import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 4.8rem;
`;

export const Warning = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 150%;
`;

export const CategoryContainer = styled.div`
  align-items: center;
  border-radius: 7.5rem;
  box-shadow: .0rem .0rem .3rem .0rem rgba(0, 0, 0, 0.10);
  display: flex;
  justify-content: center;
  gap: .8rem;
  padding: 1.4rem;
  margin-top: 2.4rem;
`;

export const CancelButton = styled.button`
  align-items: center;
  background: transparent;
  border: .1rem solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.black.main};
  display: flex;
  font-size: 1.6rem;
  font-weight: 400;
  justify-content: center;
  height: 4.2rem;
  padding: 0 1.4rem;
  transition: background .2s ease-in;

  &:hover {
    color: ${({ theme }) => theme.colors.gray.main};
  }

  &:focus {
    outline: .1rem solid ${({ theme }) => theme.colors.green.main};
  }

  &:active {
    outline: none;
    color: ${({ theme }) => theme.colors.gray.light};
  }

  &[disabled] {
    background: ${({ theme }) => theme.colors.gray.lighter} !important;
    cursor: default !important;
  }
`;

export const Actions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;

  margin-top: 4.8rem;

  button {
    height: 4.8rem;

    &:nth-child(2) {
      width: 18.0rem;
    }
  }
`;

