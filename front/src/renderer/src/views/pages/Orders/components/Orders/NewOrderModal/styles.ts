import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  .productsOptions {
    min-height: 20rem;
  }
`;

export const EmptyImageContainer = styled.div`
  width: 250px;
  margin-inline: auto;
  height: 200px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;

  img {
    border-radius: 0.4rem;
    width: 200px;
    object-fit: cover;
  }

  p {
    text-align: center;
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.red.main};
  font-size: 1.2rem;
  margin-top: 0.4rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const BoxCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

export const IconCategory = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 5px;
  opacity: 0.5;
  font-weight: bold;

  &.active {
    opacity: 1;
  }

  .circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    font-size: 14px;
  }
`;

export const ProductList = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  width: 100%;

  div.infos {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  img {
    height: 80px;
    border-radius: 12px;
  }

  span {
    color: grey;
    font-size: 14px;
  }

  div.footer {
    display: flex;
    justify-content: space-between;
    width: 90%;

    img {
      height: 24px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: aliceblue;
        transition: all 0.2s;
      }
    }
  }
`;

export const Line = styled.hr`
  margin: 16px 0;
  border: 3px;
  border-top: 1px solid #ccc;
`;

export const OrderItemsList = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 26px;

  &:last-child {
    margin-bottom: 0;
  }

  span {
    color: grey;
    font-size: 14px;
  }

  .smallImg {
    height: 60px;
    border-radius: 12px;
  }

  div.infoOrder {
    display: flex;
    justify-content: space-between;
    width: 100%;

    div.nameDetails {
      display: flex;
      flex-direction: column;

      p {
        font-size: 14px;
      }

      span {
        font-size: 12px;
        margin-bottom: -4px;
      }
    }
  }

  div.functions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    img {
      cursor: pointer;
      width: 22px;
    }
  }
`;
