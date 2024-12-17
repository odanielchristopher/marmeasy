import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  grid-area: main;
  margin-top: 1.6rem;
  width: 100%;
  height: 100%;
`;

export const Header = styled.header`
  margin-bottom: 3.6rem;
  div {
    align-items: center;
    display: flex;

    h1 {
      color: ${({ theme }) => theme.colors.black.light};
      font-size: 2.8rem;
      font-weight: 600;
      margin-left: 1.0rem;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.gray.light};
    margin-top: .4rem;
  }
`;

export const Content = styled.div`
  overflow-y: auto;
  width: 100%;
  padding-bottom: 2.4rem;
  padding-left: .8rem;
  display: flex;
  gap: 1.6rem;
  flex-wrap: wrap;
`;

export const NotFoundContainer = styled.div`
  width: 100%;
  height: calc(100vh - 32rem);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.8rem;
  color: ${({ theme }) => theme.colors.black.main};

  p {
    font-size: 1.6rem;
    font-weight: 400;
    text-align: center;

    b {
      display: block;
    }
  }
`;

export const InputContainer = styled.div`
  position: relative;

  svg {
    color: ${({ theme }) => theme.colors.gray.light};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1.0rem;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 30.0rem;
  padding: .8rem 1.0rem;
  padding-left: 4.2rem;
  border-radius: 1.0rem;
  height: 4.8rem;
  border: .08rem solid transparent;
  font-size: 1.6rem;
  line-height: 1.8rem;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.08);
`;






