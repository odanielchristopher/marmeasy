import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
  border-radius: 1.6rem;
  margin-top: 1.6rem;
  padding: 1.6rem;
  width: 100%;
  max-width: 100rem;
  position: relative;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
  display: flex;
  justify-content: space-between;

  &:hover {
    transform: translateY(-0.4rem);
  }
`;
