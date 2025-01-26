import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  header {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
  }

  ul.categoriesOptions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  ul.productsOptions {
    overflow: auto;
  }
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
    max-width: 30%;
    min-width: 30%;
    max-height: 72px;
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

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;
