import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import AppRoutes from './Routes';
import { AuthProvider } from './app/contexts/AuthContext';
import ToastContainer from './views/components/Toast/ToastContainer';

import GlobalStyles from './assets/styles/global';
import defaultTheme from './assets/styles/themes/default';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <AuthProvider>
          <ToastContainer />
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
