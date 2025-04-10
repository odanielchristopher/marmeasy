import { BrowserRouter } from 'react-router';

import { ThemeProvider } from '@app/contexts/ThemeContext';
import { Router } from '@app/Router';
import { AppHeader } from '@views/components/AppHeader';
import { Fab } from '@views/components/Fab';

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <div className="flex flex-col h-full">
          <AppHeader />

          <main className="flex-1 pt-20">
            <Router />
            <Fab />
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
