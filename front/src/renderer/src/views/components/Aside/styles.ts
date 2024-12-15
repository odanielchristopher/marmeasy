import styled from 'styled-components';

interface ContainerProps {
  $area: string;
}

export const Container = styled.aside<ContainerProps>`
  /* background-color: ${({ theme }) => theme.colors.white}; */
  background: red;
  border-radius: ${({ theme }) => theme.borderRadius};
  height: calc(100vh - (${({ theme }) => theme.margin} * 2));
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);

  grid-area: ${({ $area }) => $area};
`;
