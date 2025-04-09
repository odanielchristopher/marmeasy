import { BrowserRouter } from 'react-router';

import { ThemeProvider } from '@app/contexts/ThemeContext';
import { Router } from '@app/Router';
import { AppHeader } from '@views/components/AppHeader';

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex flex-col h-full">
          <AppHeader />

          <Router />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
