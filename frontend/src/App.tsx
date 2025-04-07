import { BrowserRouter, Link } from 'react-router';

import { ThemeProvider } from '@app/contexts/ThemeContext';
import { Router } from '@app/Router';
import { routes } from '@app/Router/routes';
import { ThemeSwitcher } from '@views/components/ThemeSwitcher';

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <header className="px-6 py-4 flex border-b mb-4 justify-between">
            <div className="flex gap-2 items-center">
              <Link
                className="text-xl font-medium hover:text-gray-200 hover:underline"
                to={routes.index}
              >
                Home
              </Link>
              <Link
                className="text-xl font-medium hover:text-gray-200 hover:underline"
                to={`${routes.users.prefix}/${routes.users.new}`}
              >
                Create user
              </Link>
            </div>

            <ThemeSwitcher />
          </header>
          <Router />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
