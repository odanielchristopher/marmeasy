import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

import AppRoutes from '../../routes';
import { Container } from './styles';

export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Container>
        <h1>Cabecalho</h1>
        <AppRoutes />
      </Container>
    </ThemeProvider>
  );
}
