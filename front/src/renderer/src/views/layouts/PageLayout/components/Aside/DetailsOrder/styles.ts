import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  overflow-y: auto;

  header {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
  }

  footer {
    display: flex;
    justify-content: space-between;

    .left-footer {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 16px;
      color: ${({ theme }) => theme.colors.gray.main};
    }

    .right-footer {
      display: flex;
      flex-direction: column;
      gap: 6px;
      text-align: right;
      font-size: 16px;
    }
  }
`;

export const ItemBox = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--white);
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.2rem;

  /* .img {
    min-height: 70px;
    width: 20%;
    background-color: grey;
    border-radius: 8px 0 0 8px;
  } */

  .right {
    display: flex;
    flex-direction: column;
    min-width: 100%;
    /* padding: 10px 16px 10px 8px; */
    .top {
      display: flex;
      justify-content: space-between;
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .ingredients {
        font-size: 14px;
        color: ${({ theme }) => theme.colors.gray.main};
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 8px 0;
`;

export const ButtonDelete = styled.div`
  background-color: ${({ theme }) => theme.colors.red.main};
  color: #fff;
  border-radius: 8px;
  padding: 8px;
  margin-top: 15px;
  text-align: center;
  cursor: pointer;
  opacity: 1;
  transition: ease-in-out .2s;

  &:hover {
    opacity: .7;
    transition: ease-in-out .2s;
  }
`;
