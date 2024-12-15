import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 10;
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
  transition: background .3s;

  &[data-state="open"] {
    transform: rotate(90deg);
  }

  &:hover {
    background: ${({ theme }) => theme.colors.green.dark};
    transition: background .3s;
  }
`;

export const StyledItem = styled.button`
  width: 100%;
  gap: .8rem;
  transition: background .3s;
  
  &:hover {
    transition: background .3s;
  }
`;

export const FormModal = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .dividerInput {
    display: flex;
    /* gap: 10px; */
    justify-content: space-between;
    width: 100%;
    gap: 1.2rem;
    align-items: center;
    margin-top: 1.2rem;

    & > div {
      margin-top: 0;
    }

    & > div:first-child {
      width: 45%;
    }

    & > div:last-child {
      width: 100%;
    }
  }
`;
