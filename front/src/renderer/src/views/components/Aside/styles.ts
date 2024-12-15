import styled from 'styled-components';

export const AsideContainer = styled.aside`
  position: fixed;
  display: flex;
  align-items: center;
  top: 2.4rem;
  right: 2.4rem;
  flex-direction: column;
  width: 40rem;
  height: 94.5%;
  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);

  img {
    margin-top: 2.4rem;
    width: 16rem;  
    height: 5rem;
  }


`;

export const Container = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  flex-direction: column; /* Alinha os itens verticalmente */
  justify-content: center;
  align-items: center;
  gap: 1rem; /* Espaçamento entre .search e h2 */

  .search {
    font-size: 4.5rem;
    color: ${({ theme }) => theme.colors.gray.light};
  }

  h2 {
    font-size: 1.7rem;
    color: ${({ theme }) => theme.colors.black.light};
  }
`;