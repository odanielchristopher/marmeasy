import { BrowserRouter } from 'react-router';

import { ThemeProvider } from '@app/contexts/ThemeContext';
import { Router } from '@app/Router';
import { AppHeader } from '@views/components/AppHeader';

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <div className="flex flex-col h-full">
          <AppHeader />

          <main className="flex-1 pt-20">
            <Router />
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
