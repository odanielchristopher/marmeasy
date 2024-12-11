import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import AppRoutes from './Routes';
import { AuthProvider } from './app/contexts/AuthContext';
import ToastContainer from './views/components/Toast/ToastContainer';

import GlobalStyles from './assets/styles/global';
import defaultTheme from './assets/styles/themes/default';

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyles />
          <ToastContainer />
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
