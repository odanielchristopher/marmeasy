import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 3.2rem;
`;

export const LoaderContainer = styled.div`
  height: calc(100vh - 38rem);
`;

export const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.4rem;

  .infos {
    display: flex;
    gap: 0.8rem;

    span {
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 120%;

      background: #ccc;
      border-radius: 0.4rem;
      padding: 0.4rem 0.8rem;
    }
  }

  button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.orange.light};
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 150%;
  }
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 120%;
`;

export const ProductImage = styled.img`
  border-radius: 0.4rem;
  height: 3.2rem;
  object-fit: cover;
  width: 4.8rem;
`;

export const ActionButton = styled.button`
  background: transparent;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.8rem;
`;

export const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
