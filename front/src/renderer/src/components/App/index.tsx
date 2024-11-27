import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

import AppRoutes from '../../routes';

export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <AppRoutes />
    </ThemeProvider>
  );
}
