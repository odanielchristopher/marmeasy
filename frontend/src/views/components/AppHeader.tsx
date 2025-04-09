import { Link } from 'react-router';

import { routes } from '@app/Router/routes';
import { Logo } from '@views/assets/Logo';

import { ThemeSwitcher } from './ThemeSwitcher';

export function AppHeader() {
  return (
    <header className="px-6 py-4 flex border-b mb-4 justify-between bg-primary-400">
      <div className="flex gap-2 items-center">
        <div>
          <Logo />
        </div>

        <Link
          className="text-xl font-medium hover:text-gray-200 hover:underline"
          to={routes.index}
        >
          Home
        </Link>
        <Link
          className="text-xl font-medium hover:text-gray-200 hover:underline"
          to={routes.users.new.row}
        >
          Create user
        </Link>
      </div>

      <ThemeSwitcher />
    </header>
  );
}
