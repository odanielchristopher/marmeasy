import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';

import { ThemeProvider } from '@app/contexts/ThemeContext';
import { queryClient } from '@app/lib/queryClient';
import { Router } from '@app/Router';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
