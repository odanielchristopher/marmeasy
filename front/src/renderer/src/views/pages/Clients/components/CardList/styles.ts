import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FFF;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
  border-radius: 1.6rem;
  margin-top: 1.6rem;
  padding: 1.6rem;
  width: 100%;
  max-width: 30.0rem;
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    transform: translateY(-0.4rem);
  }
`;

export const Name = styled.strong`
  color: ${({ theme }) => theme.colors.black.light};
  font-size: 2.0rem;
  font-weight: 700;
`;

export const Address = styled.strong`
  font-weight: 700;
  font-size: 1.6rem;
`;

export const NameContainer = styled.div`

`;


export const Header= styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  height: 5.0rem;
  margin-bottom: 1.2rem;

  .infos {
    display: flex;
    flex-direction: column;
    gap: .2rem;
    color: ${({ theme }) => theme.colors.black.light};

    strong {
      font-size: 1.8rem;
    }

    span {
      font-size: 1.4rem;
    }
  }

  .deleteButton {
    display: flex;
    align-items: center;
    justify-content: center;

    background: transparent;
    border: none;
    border-radius: 50%;
    height: 3.2rem;
    width: 3.2rem;

    &:hover {
      background: #F2F2F2;
    }
  }
`;

export const Main = styled.div`
  border-top: .1rem solid #CCC;
  border-bottom: .1rem solid #CCC;
  padding-top: 1.2rem;
  padding-bottom: .8rem;

  .top {
    display: flex;
    flex-direction: column;
    height: 7.0rem;

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
    margin-bottom: 1.0rem;
  }

  &.footer {
  margin-bottom: 1.0rem;
  }
`;

export const details = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 2.5rem;
  background-color: red;
`;
