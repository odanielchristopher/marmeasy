import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
  border-radius: 1.6rem;
  margin-top: 1.6rem;
  padding: 1.6rem;
  width: 100%;
  max-width: 30rem;

  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    transform: translateY(-0.4rem);
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
      background: #f2f2f2;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  height: 5rem;
  margin-bottom: 1.2rem;

  .infos {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    color: ${({ theme }) => theme.colors.black.light};

    .infos-header {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      strong {
        font-size: 1.8rem;
      }

      span {
        background: ${({ theme }) => theme.colors.orange.lighter};
        color: #ffff;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 1.2rem;
        letter-spacing: 0.02rem;
        padding: 0.1rem 1.2rem;
        border-radius: 0.2rem;
      }
    }

    span {
      font-size: 1.4rem;
    }
  }
`;

export const Main = styled.div`
  border-top: 0.1rem solid #ccc;
  border-bottom: 0.1rem solid #ccc;
  padding-top: 1.2rem;
  padding-bottom: 0.8rem;

  .top {
    display: flex;
    flex-direction: column;
    height: 7rem;

    span {
      color: ${({ theme }) => theme.colors.black.light};
    }
  }

  .bottom {
    color: ${({ theme }) => theme.colors.black.light};
  }
`;

export const Footer = styled.footer`
  margin-top: 1.2rem;
  display: flex;
  justify-content: space-between;

  strong {
    font-size: 1.8rem;
  }
`;

export const Separator = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  width: 100%;

  &.header {
    margin-top: 1.6rem;
    margin-bottom: 1rem;
  }

  &.footer {
    margin-bottom: 1rem;
  }
`;

export const details = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 2.5rem;
  background-color: red;
`;
