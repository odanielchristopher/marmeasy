import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

import { Container } from './styles';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Container>
        <h1>Pedidos</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati dolorum ipsum maiores
          inventore esse adipisci, dicta quo deleniti tenetur labore corporis reiciendis commodi
          veniam, consequuntur beatae soluta accusamus! Voluptate, ex?
        </p>
      </Container>
    </ThemeProvider>
  );
}

export default App;
