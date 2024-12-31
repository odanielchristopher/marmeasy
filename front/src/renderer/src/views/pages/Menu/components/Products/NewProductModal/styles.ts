import * as Checkbox from '@radix-ui/react-checkbox';
import styled, { css } from 'styled-components';

const widthBreak = '1024px';

export const Container = styled.div`
  @media (max-width: ${widthBreak}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50.0rem;
  }

  h3 {
    color: ${({ theme }) => theme.colors.gray.light};
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 120%;
  }
`;

export const Content = styled.main`
  @media (max-width: ${widthBreak}) {
    flex-wrap: nowrap;
    height: 100vh;
  }

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 3.2rem;
  max-height: 68rem;
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  button {
    width: 20rem;
  }

  @media (max-width: ${widthBreak}) {
    button {
      width: 100%;
    }
  }
`;

export const ImageSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const InputsContainer = styled.div`
  max-width: 42rem;

  p {
    color: ${({ theme }) => theme.colors.gray.light};
    font-size: 1.4rem;
    line-height: 150%;
    margin-top: 0.8rem;
  }
`;

export const CategorySection = styled.section`
  max-width: 42rem;

  header {
    align-items: center;
    display: flex;
    justify-content: space-between;

    .title {
      color: ${({ theme }) => theme.colors.gray.light};
      font-size: 1.4rem;
      line-height: 150%;
    }

    .error {
      align-items: center;
      color: ${({ theme }) => theme.colors.red.dark};
      display: flex;
      font-size: 1.2rem;
      gap: 0.6rem;
      margin-top: 0.2rem;
    }
  }
`;

export const CategoryList = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  max-width: 42rem;
  margin-top: 1.6rem;
  margin-bottom: 3.2rem;
  padding-block: 0.2rem;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  .categories-loader {
    width: 42.0rem;
    height: 4.8rem;
  }
`;

interface CategoryItemProps {
  $selected?: boolean
}

export const CategoryItem = styled.div<CategoryItemProps>`
  align-items: center;
  border-radius: 7.5rem;
  border: 1px solid transparent;
  box-shadow: 0rem 0rem 0.3rem 0rem rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.1rem 1.4rem;

  cursor: pointer;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.orange.main};
  }

  ${({ theme, $selected }) =>
    $selected &&
    css`
      border: 1px solid ${theme.colors.orange.main};
    `}
`;

export const IngredientsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 42rem;

  @media (max-width: ${widthBreak}) {
    height: 100vh;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      background: transparent;
      border: none;
      color: ${({ theme }) => theme.colors.orange.main};
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 150%;
    }
  }

  .filter {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    span {
      color: ${({ theme }) => theme.colors.gray.light};
      font-size: 1.4rem;
      line-height: 150%;
    }

    input {
      border: 1px solid ${({ theme }) => theme.colors.gray.lighter};
      border-radius: 1rem;
      font-size: 1.4rem;
      line-height: 150%;
      padding: 1.6rem;
      width: 100%;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    width: 100%;
    max-height: 35rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #888;

      &:hover {
        background: #555;
      }
    }

    .ingredient-loader {
      height: 42.0rem;
    }

    .item {
      border: 1px solid ${({ theme }) => theme.colors.gray.lighter};
      border-radius: 1rem;
      color: ${({ theme }) => theme.colors.gray.light};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: 1.4rem;
      line-height: 150%;

      padding: 1.6rem;
    }
  }
`;

export const StyledRdxCheckbox = styled(Checkbox.Root)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray.main};
  color: ${({ theme }) => theme.colors.gray.main};
  border-radius: 0.4rem;
  height: 1.8rem;
  width: 1.8rem;

  .indicator {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
