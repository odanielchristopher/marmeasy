import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router';

import { AuthProvider } from '@app/contexts/AuthContext';
import { ThemeProvider } from '@app/contexts/ThemeContext';
import { queryClient } from '@app/lib/queryClient';
import { Router } from '@app/Router';
import { usersService } from '@app/services/usersService';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider usersService={usersService}>
        <ThemeProvider defaultTheme="light">
          <BrowserRouter>
            <Router />
            <Toaster position="top-right" />

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
