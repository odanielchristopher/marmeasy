import { BrowserRouter } from 'react-router';

import { ThemeProvider } from '@app/contexts/ThemeContext';
import { Router } from '@app/Router';
import { HeaderApp } from '@views/components/HeaderApp';

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex flex-col h-full">
          <HeaderApp />

          <Router />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
