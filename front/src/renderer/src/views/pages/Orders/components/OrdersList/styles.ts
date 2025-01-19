import styled from 'styled-components';

export const Container = styled.div`
  background-color: #FFF;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
  border-radius: 1.6rem;
  margin-top: 1.6rem;
  padding: 1.6rem;
  width: 100%;
  max-width: 100.0rem;

  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    transform: translateY(-.4rem);
  }

  position: relative;

  .deleteButton {
    display: flex;
    align-items: center;
    justify-content: center;

    background: transparent;
    border: none;
    border-radius: 50%;
    height: 3.2rem;
    width: 3.2rem;

    position: absolute;
    right: 1.6rem;
    z-index: 2;

    &:hover {
      background: #F2F2F2;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Left= styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  height: 5.0rem;
  margin-bottom: 0.8rem;

  .infos {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: ${({ theme }) => theme.colors.black};

    .infos-left {
      display: flex;
      align-items: center;
      gap: .8rem;

      strong {
        font-size: 1.8rem;
      }

      span {
        background: ${({ theme }) => theme.colors.orange.lighter};
        color: #FFFF;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 1.2rem;
        letter-spacing: 0.02rem;
        padding: .1rem 1.2rem;
        border-radius: .2rem;
      }
    }

    span {
      font-size: 1.4rem;
    }
  }
`;

export const Right = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  .infos {
    display: flex;
    flex-direction: column;
    gap: .8rem;
    color: ${({ theme }) => theme.colors.black.lighter};

    .infos-right {
      display: flex;
      align-items: center;
      gap: .6rem;
      color: ${({ theme }) => theme.colors.orange.lighter};

      span.date {
        font-size: 1.4rem;
      }
    }

    span.price {
      font-size: 1.8rem;
      font-weight: 500;
    }
  }

`;

export const details = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 2.5rem;
  background-color:red;
`;