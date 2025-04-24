import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router';

import { AuthProvider } from '@app/contexts/AuthContext';
import { ThemeProvider } from '@app/contexts/ThemeContext';
import { queryClient } from '@app/lib/queryClient';
import { Router } from '@app/Router';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="light">
          <BrowserRouter>
            <Router />

            <ReactQueryDevtools
              position="bottom"
              buttonPosition="bottom-left"
            />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
