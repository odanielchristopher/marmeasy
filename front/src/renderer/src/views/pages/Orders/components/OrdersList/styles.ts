import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
  border-radius: 1.6rem;
  margin-top: 1.6rem;
  padding: 2rem;
  width: 100%;
  max-width: 100rem;
  position: relative;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.2rem solid transparent;

  &:hover {
    transform: translateY(-0.4rem);
  }

  &.selected {
    border: 0.2rem solid orange;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 10px;
    span {
      color: ${({ theme }) => theme.colors.gray.light};
    }

    .clientsInfo {
      display: flex;
      gap: 10px;
      align-items: center;

      span {
        background: #E6B04E;
        color: #ffff;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 1.2rem;
        letter-spacing: 0.02rem;
        padding: 0.1rem 1.2rem;
        border-radius: 0.2rem;
      }
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;

    span:first-child {
      color: ${({ theme }) => theme.colors.gray.light};
    }

    span:last-child {
      color: ${({ theme }) => theme.colors.green.main};
      font-weight: bold;
    }

  }
`;
