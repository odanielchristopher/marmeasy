import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0%;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.colors.black.main};
    font-size: 1.6rem;
  }

  button {
    cursor: pointer;
  }
`;
