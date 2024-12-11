import { ThemeProvider } from 'styled-components';
import AppRoutes from './Routes';

import { AuthProvider } from './app/contexts/AuthContext';
import ToastContainer from './views/components/Toast/ToastContainer';

import GlobalStyles from './assets/styles/global';
import defaultTheme from './assets/styles/themes/default';

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}
